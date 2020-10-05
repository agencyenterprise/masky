import { PredictedObject } from "@tensorflow/tfjs-automl";

export const DETECTION_THRESHOLD = 0.65;

export type DetectionStatus = "loading" | "none" | "face" | "mask" | "both";

export const DetectionColor: Record<DetectionStatus, string> = {
  loading: "secondary",
  face: "noMask",
  mask: "yesMask",
  both: "mixedMasks",
  none: "secondary",
};

export const getDetectionStatus = (
  detections: PredictedObject[] | null
): DetectionStatus => {
  if (!detections) {
    return "none";
  }

  let masks = 0;
  let faces = 0;

  detections.forEach((detection) => {
    if (detection.label === "mask") {
      masks += 1;
    } else if (detection.label === "face") {
      faces += 1;
    }
  });

  return statusFromCounts(masks, faces);
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
