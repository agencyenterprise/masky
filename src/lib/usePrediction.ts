import React, { useState, useCallback, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";

import { Prediction } from "./Prediction";
import { WebcamStatus } from "./useWebcam";

const PREDICTION_THRESHOLD = 0.65;
const PREDICTION_TIME = 1000;

export const usePrediction = (
  model: tf.LayersModel | null,
  videoRef: React.MutableRefObject<HTMLVideoElement | null>,
  webcamStatus: WebcamStatus
): Prediction => {
  const [prediction, setPrediction] = useState<Prediction>(Prediction.Loading);

  const onInterval = useCallback(
    () => classify(model, videoRef, setPrediction),
    [model, videoRef, setPrediction]
  );

  useEffect(() => {
    if (webcamStatus !== WebcamStatus.Ready) return;

    const handle = setInterval(onInterval, PREDICTION_TIME);
    return () => {
      clearInterval(handle);
    };
  });

  return prediction;
};

const classify = async (
  model: tf.LayersModel | null,
  videoRef: React.MutableRefObject<HTMLVideoElement | null>,
  setPrediction: (prediction: Prediction) => void
) => {
  if (!model || !videoRef.current) return;
  const video = videoRef.current;

  tf.tidy(() => {
    const image = tf.browser
      .fromPixels(video)
      .resizeBilinear([224, 224])
      .expandDims(0)
      .div(255);

    const prediction = model.predict(image);

    const firstPrediction = Array.isArray(prediction)
      ? prediction[0]
      : prediction;

    const data = firstPrediction.dataSync();
    const face = data[0];
    const mask = data[1];

    setPrediction(getPrediction(face, mask));
  });
};

const getPrediction = (face: number, mask: number): Prediction => {
  const highPrediction = Math.max(face, mask);
  if (highPrediction < PREDICTION_THRESHOLD) {
    return Prediction.None;
  }

  return face >= mask ? Prediction.Face : Prediction.Mask;
};
