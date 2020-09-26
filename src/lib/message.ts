import { WebcamStatus } from "./useWebcam";
import { Detections, DetectionStatus } from "./Detection";

export const webcamStatusMessage: Record<WebcamStatus, string> = {
  waiting: "Waiting for camera...",
  connected: "Loading model...",
  failed: "Couldn't connect to camera.",
};

export const detectionMessage: Record<DetectionStatus, string> = {
  loading: "Loading model...",
  none: "I'm not sure. Try getting closer to the screen.",
  both: "Ask your friends to put on a mask!",
  face: "Don't forget your mask!",
  mask: "Thanks for wearing a mask!",
};

export const getMessage = (
  detections: Detections,
  webcamStatus: WebcamStatus,
  started: boolean
): string => {
  if (detections.status === "loading") {
    return webcamStatusMessage[webcamStatus];
  } else if (!started) {
    return "Ready to start";
  } else {
    return detectionMessage[detections.status];
  }
};
