export enum Prediction {
  Loading = "loading",
  None = "none",
  Face = "face",
  Mask = "mask",
}

export const PredictionColor = {
  [Prediction.Loading]: "black",
  [Prediction.None]: "black",
  [Prediction.Face]: "red",
  [Prediction.Mask]: "green",
};

export const PredictionMessage = {
  [Prediction.Loading]: "Connecting to webcam...",
  [Prediction.None]: "I'm not sure. Try facing directly at the screen.",
  [Prediction.Face]: "Don't forget your mask!",
  [Prediction.Mask]: "Thanks for wearing a mask!",
};
