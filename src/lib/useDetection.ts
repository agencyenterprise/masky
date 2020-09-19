import React, { useState, useCallback, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as automl from "@tensorflow/tfjs-automl";

export const DEFAULT_DETECTIONS_TIME = 1000;

export type PredictedObjects = automl.PredictedObject[] | null;

export const useDetection = (
  model: automl.ObjectDetectionModel | null,
  videoRef: React.MutableRefObject<HTMLVideoElement | null>,
  detectionInterval = DEFAULT_DETECTIONS_TIME
): [automl.PredictedObject[] | null, () => void] => {
  const [detections, setDetections] = useState<PredictedObjects>(null);
  const [webcamReady, setWebcamReady] = useState(false);

  const handleReady = useCallback(() => setWebcamReady(true), [setWebcamReady]);

  // Warm up model while the camera is connecting.
  useEffect(() => {
    if (model) {
      setTimeout(() => {
        warmUp(model);
      }, 1);
    }
  }, [model]);

  // Start running detections after webcam is connected.
  useEffect(() => {
    if (!webcamReady) return;

    const handle = setInterval(
      () => detect(model, videoRef, setDetections),
      detectionInterval
    );

    return () => {
      clearInterval(handle);
    };
  }, [webcamReady, detectionInterval, model, videoRef, setDetections]);

  return [detections, handleReady];
};

const warmUp = (model: automl.ObjectDetectionModel) => {
  const dummyImage = tf.zeros<tf.Rank.R3>([3, 3, 3]);
  model?.detect(dummyImage);
};

const detect = async (
  model: automl.ObjectDetectionModel | null,
  videoRef: React.MutableRefObject<HTMLVideoElement | null>,
  setDetections: (detections: PredictedObjects) => void
) => {
  if (!model || !videoRef.current) return;
  const video = videoRef.current;

  const detections = await model.detect(video);
  setDetections(detections);
};
