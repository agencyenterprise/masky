import React, { useState, useCallback } from "react";
import * as tf from "@tensorflow/tfjs";

import { Prediction } from "./Prediction";

const PREDICTION_THRESHOLD = 0.65;

export const usePrediction = (
  model: tf.LayersModel | null,
  videoRef: React.MutableRefObject<HTMLVideoElement | null>
): [Prediction, () => void] => {
  const [prediction, setPrediction] = useState<Prediction>(Prediction.Loading);

  const onInterval = useCallback(classify(model, videoRef, setPrediction), [
    model,
    videoRef,
    setPrediction,
  ]);

  const onLoaded = useCallback(() => {
    const handle = setInterval(onInterval, 100);
    return () => {
      clearInterval(handle);
    };
  }, [onInterval]);

  return [prediction, onLoaded];
};

const classify = (
  model: tf.LayersModel | null,
  videoRef: React.MutableRefObject<HTMLVideoElement | null>,
  setPrediction: (prediction: Prediction) => void
) => async () => {
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
    console.log(highPrediction);
    return Prediction.None;
  }

  return face >= mask ? Prediction.Face : Prediction.Mask;
};
