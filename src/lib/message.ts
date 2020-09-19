import { WebcamStatus, WebcamStatusMessage } from "./useWebcam";
import { Detections, DetectionMessage } from "./Detection";

export const getMessage = (
  detections: Detections,
  webcamStatus: WebcamStatus
): string => {
  if (detections.status === "loading") {
    return WebcamStatusMessage[webcamStatus];
  } else {
    return DetectionMessage[detections.status];
  }
};
