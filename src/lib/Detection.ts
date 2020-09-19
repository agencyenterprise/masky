import * as automl from "@tensorflow/tfjs-automl";

export const DETECTION_THRESHOLD = 0.65;

export interface Detections {
  masks: number;
  faces: number;
  status: DetectionStatus;
  boxes: automl.PredictedObject[];
}

export type DetectionStatus = "loading" | "none" | "face" | "mask" | "both";

export const DetectionColor: Record<DetectionStatus, string> = {
  loading: "#032B43",
  face: "#D00000",
  mask: "#136F63",
  both: "#FFBA08",
  none: "#032B43",
};

export const calculateDetections = (
  detections: automl.PredictedObject[] | null
): Detections => {
  if (!detections) {
    return defaultDetections;
  }

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
    return "both";
  }
  if (masks > 0) {
    return "mask";
  }
  if (faces > 0) {
    return "face";
  }
  return "none";
};

export const defaultDetections: Detections = {
  status: "loading",
  masks: 0,
  faces: 0,
  boxes: [],
};
