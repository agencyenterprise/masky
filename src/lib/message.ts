import { WebcamStatus } from "./useWebcam";
import { Detections, DetectionStatus } from "./Detection";

export const webcamStatusMessage: Record<WebcamStatus, string> = {
  waiting: "Waiting for camera...",
  connected: "Starting predictions...",
  failed: "Couldn't connect to camera.",
};

export const detectionMessage: Record<DetectionStatus, string> = {
  loading: "Starting predictions...",
  none: "I'm not sure. Try getting closer to the screen.",
  both: "Ask your friends to put on a mask!",
  face: "Don't forget your mask!",
  mask: "Thanks for wearing a mask!",
};

export const getMessage = (
  detections: Detections,
  webcamStatus: WebcamStatus
): string => {
  if (detections.status === "loading") {
    return webcamStatusMessage[webcamStatus];
  } else {
    return detectionMessage[detections.status];
  }
};
