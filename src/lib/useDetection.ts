import React, { useState, useCallback, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as automl from "@tensorflow/tfjs-automl";

export const DETECTION_INTERVAL = 500;
export const DETECTION_THRESHOLD = 0.45;

export type PredictedObjects = automl.PredictedObject[] | null;

export const useDetection = (
  model: automl.ObjectDetectionModel | null,
  videoRef: React.MutableRefObject<HTMLVideoElement | null>,
  started = true
): [PredictedObjects, () => void] => {
  const [detections, setDetections] = useState<PredictedObjects>(null);
  const [videoReady, setVideoReady] = useState(false);

  const onVideoReady = useCallback(() => setVideoReady(true), [setVideoReady]);

  // Start running detections after webcam is connected.
  useEffect(() => {
    const video = videoRef.current;
    if (!started || !videoReady || !model || !video) return;

    const detect = (video: HTMLVideoElement) =>
      // Run the model, and ignore low-probability detections.
      model.detect(video, { score: DETECTION_THRESHOLD });

    // First run
    detect(video).then(setDetections);

    // Schedule detections.
    const handle = setInterval(
      () => detect(video).then(setDetections),
      DETECTION_INTERVAL
    );

    // Clean up the interval if the useEffect is re-run.
    return () => {
      clearInterval(handle);
    };
  }, [started, videoReady, model, videoRef, setDetections]);

  return [detections, onVideoReady];
};

/** Warm up the model after loading. */
export const useWarmUp = (model: automl.ObjectDetectionModel | null) => {
  const [warmedUp, setWarmedUp] = useState(false);

  // Warm up model while the camera is connecting.
  useEffect(() => {
    if (model) {
      warmUp(model).then(() => setWarmedUp(true));
    }
  }, [model]);

  return warmedUp;
};

const warmUp = async (model: automl.ObjectDetectionModel): Promise<void> => {
  const dummyImage = tf.zeros<tf.Rank.R3>([3, 3, 3]);
  await model.detect(dummyImage);
};
