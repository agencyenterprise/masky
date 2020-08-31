import { WebcamStatus, WebcamStatusMessage } from "./useWebcam";
import { Detections, DetectionMessage, DetectionStatus } from "./Detection";

export const getMessage = (
  detections: Detections,
  webcamStatus: WebcamStatus
): string => {
  if (detections.status === DetectionStatus.Loading) {
    return WebcamStatusMessage[webcamStatus];
  } else {
    return DetectionMessage[detections.status];
  }
};
