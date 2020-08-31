import * as automl from "@tensorflow/tfjs-automl";

export const DETECTION_THRESHOLD = 0.65;

export interface Detections {
  masks: number;
  faces: number;
  status: DetectionStatus;
  boxes: automl.PredictedObject[];
}

export enum DetectionStatus {
  Loading = "loading",
  None = "none",
  Face = "face",
  Mask = "mask",
  Both = "both",
}

export const DetectionColor: Record<DetectionStatus, string> = {
  [DetectionStatus.Loading]: "black",
  [DetectionStatus.Face]: "red",
  [DetectionStatus.Mask]: "green",
  [DetectionStatus.Both]: "orange",
  [DetectionStatus.None]: "black",
};

export const DetectionMessage: Record<DetectionStatus, string> = {
  [DetectionStatus.Loading]: "Starting predictions...",
  [DetectionStatus.None]: "I'm not sure. Try getting closer to the screen.",
  [DetectionStatus.Both]: "Ask your friends to put on a mask!",
  [DetectionStatus.Face]: "Don't forget your mask!",
  [DetectionStatus.Mask]: "Thanks for wearing a mask!",
};

export const calculateDetections = (detections: automl.PredictedObject[]) => {
  const boxes = detections.filter(
    (detection) => detection.score > DETECTION_THRESHOLD
  );
  const masks = boxes.filter((detection) => detection.label === "mask").length;
  const faces = boxes.filter((detection) => detection.label === "face").length;

  const status = statusFromCounts(masks, faces);

  return { masks, faces, status, boxes };
};

const statusFromCounts = (masks: number, faces: number): DetectionStatus => {
  if (masks > 0 && faces > 0) {
    return DetectionStatus.Both;
  }
  if (masks > 0) {
    return DetectionStatus.Mask;
  }
  if (faces > 0) {
    return DetectionStatus.Face;
  }
  return DetectionStatus.None;
};

export const defaultDetections: Detections = {
  status: DetectionStatus.Loading,
  masks: 0,
  faces: 0,
  boxes: [],
};
