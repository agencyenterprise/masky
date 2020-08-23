import React, { useState, useCallback } from "react";

import * as tf from "@tensorflow/tfjs";
import * as faceapi from "face-api.js";

export const usePrediction = (
  model: tf.LayersModel | null,
  videoRef: React.MutableRefObject<HTMLVideoElement | null>
): [string, HTMLCanvasElement[], () => void] => {
  const [prediction, setPrediction] = useState<string>("none");
  const [canvases, setCanvases] = useState<HTMLCanvasElement[]>([]);

  const onInterval = useCallback(
    classify(model, videoRef, setPrediction, setCanvases),
    [model, videoRef, setPrediction, setCanvases]
  );

  const onLoaded = useCallback(() => {
    const handle = setInterval(onInterval, 100);
    return () => {
      clearInterval(handle);
    };
  }, [onInterval]);

  return [prediction, canvases, onLoaded];
};

const classify = (
  model: tf.LayersModel | null,
  videoRef: React.MutableRefObject<HTMLVideoElement | null>,
  setPrediction: (prediction: string) => void,
  setCanvases: (canvases: HTMLCanvasElement[]) => void
) => async () => {
  if (!model || !videoRef.current) return;
  const video = videoRef.current;

  let image = tf.browser.fromPixels(video);

  const detections = await faceapi.detectAllFaces(
    image as any,
    new faceapi.TinyFaceDetectorOptions()
  );

  if (detections.length === 0) {
    // setPrediction("none");
    // setCanvases([]);
    return;
  }

  const images = await faceapi.extractFaceTensors(image as any, detections);
  const canvases = await faceapi.extractFaces(image as any, detections);

  setCanvases(canvases);

  tf.tidy(() => {
    // const image = (images[0].expandDims(0) as any)
    //   .resizeBilinear([224, 224])
    //   .div(255);
    // With no face detection:
    image = image.resizeBilinear([224, 224]).expandDims(0).div(255);

    const prediction = model.predict(image);

    const firstPrediction = Array.isArray(prediction)
      ? prediction[0]
      : prediction;

    const data = firstPrediction.dataSync();
    const face = data[0];
    const mask = data[1];

    setPrediction(face >= mask ? "face" : "mask");
  });

  image.dispose();
  images.forEach((image) => image.dispose());
};
