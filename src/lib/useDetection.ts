import React, { useState, useCallback, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as automl from "@tensorflow/tfjs-automl";

export const DEFAULT_DETECTIONS_TIME = 1000;

export type PredictedObjects = automl.PredictedObject[] | null;

export const useDetection = (
  model: automl.ObjectDetectionModel | null,
  videoRef: React.MutableRefObject<HTMLVideoElement | null>,
  detectionInterval = DEFAULT_DETECTIONS_TIME
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

    const handle = setInterval(
      () => model.detect(video).then(setDetections),
      detectionInterval
    );

    return () => {
      clearInterval(handle);
    };
  }, [videoReady, detectionInterval, model, videoRef, setDetections]);

  return [detections, onVideoReady];
};

const warmUp = (model: automl.ObjectDetectionModel) => {
  const dummyImage = tf.zeros<tf.Rank.R3>([3, 3, 3]);
  model.detect(dummyImage);
};
