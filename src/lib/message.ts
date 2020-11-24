import { ObjectDetectionModel } from "@tensorflow/tfjs-automl";

import { WebcamStatus } from "./useWebcam";
import { DetectionStatus } from "./getDetectionStatus";

export const webcamStatusMessage: Record<WebcamStatus, string> = {
  waiting: "Waiting for camera...",
  failed: "Couldn't connect to camera. 😞",
  connected: "",
};

export const detectionMessage: Record<DetectionStatus, string> = {
  loading: "Thinking...🤔",
  none: "I'm not sure. Try getting closer to the screen. 🤔",
  both: "Ask your friends to put on a mask! 😒",
  face: "Don't forget your mask! 😱",
  mask: "Thanks for wearing a mask! 👏",
};

export interface MessageStatuses {
  model: ObjectDetectionModel | null;
  detectionStatus: DetectionStatus;
  webcamStatus: WebcamStatus;
  started?: boolean;
  warmedUp?: boolean;
}

export const getMessage = ({
  model,
  detectionStatus,
  webcamStatus,
  started = true,
  warmedUp = true,
}: MessageStatuses): string => {
  if (webcamStatus !== "connected") {
    return webcamStatusMessage[webcamStatus];
  } else if (!model) {
    return "Downloading model ⌛";
  } else if (!warmedUp) {
    return "🔥 Warming up the model 🔥";
  } else if (!started) {
    return "✨ Ready to start ✨";
  } else {
    return detectionMessage[detectionStatus];
  }
};
