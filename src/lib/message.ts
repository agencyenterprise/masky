import { Prediction, PredictionMessage } from "./Prediction";
import { WebcamStatus, WebcamStatusMessage } from "./useWebcam";

export const getMessage = (
  prediction: Prediction,
  webcamStatus: WebcamStatus
): string => {
  if (prediction === Prediction.Loading) {
    return WebcamStatusMessage[webcamStatus];
  } else {
    return PredictionMessage[prediction];
  }
};
