import React, { useState, useCallback, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as automl from "@tensorflow/tfjs-automl";

export const DETECTION_INTERVAL = 500;
export const DETECTION_THRESHOLD = 0.62;

export type PredictedObjects = automl.PredictedObject[] | null;

export const useDetection = (
  model: automl.ObjectDetectionModel | null,
  videoRef: React.MutableRefObject<HTMLVideoElement | null>
): [PredictedObjects, () => void] => {
  const [detections, setDetections] = useState<PredictedObjects>(null);
  const [videoReady, setVideoReady] = useState(false);

  const onVideoReady = useCallback(() => setVideoReady(true), [setVideoReady]);

  // Warm up model while the camera is connecting.
  useEffect(() => {
    if (model) {
      warmUp(model);
    }
  }, [model]);

  // Start running detections after webcam is connected.
  useEffect(() => {
    const video = videoRef.current;
    if (!videoReady || !model || !video) return;

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
  }, [videoReady, model, videoRef, setDetections]);

  return [detections, onVideoReady];
};

const warmUp = (model: automl.ObjectDetectionModel) => {
  const dummyImage = tf.zeros<tf.Rank.R3>([3, 3, 3]);
  model.detect(dummyImage);
};
