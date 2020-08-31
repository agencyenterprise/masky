import React, { useState, useCallback, useEffect } from "react";
import "@tensorflow/tfjs";
import * as automl from "@tensorflow/tfjs-automl";

import {
  Detections,
  defaultDetections,
  calculateDetections,
} from "./Detection";
import { WebcamStatus } from "./useWebcam";

const DETECTIONS_TIME = 1000;

export const useDetection = (
  model: automl.ObjectDetectionModel | null,
  videoRef: React.MutableRefObject<HTMLVideoElement | null>,
  webcamStatus: WebcamStatus
): Detections => {
  const [detections, setDetections] = useState<Detections>(defaultDetections);

  const onInterval = useCallback(() => detect(model, videoRef, setDetections), [
    model,
    videoRef,
    setDetections,
  ]);

  useEffect(() => {
    if (webcamStatus !== WebcamStatus.Ready) return;

    const handle = setInterval(onInterval, DETECTIONS_TIME);
    return () => {
      clearInterval(handle);
    };
  });

  return detections;
};

const detect = async (
  model: automl.ObjectDetectionModel | null,
  videoRef: React.MutableRefObject<HTMLVideoElement | null>,
  setDetections: (detections: Detections) => void
) => {
  if (!model || !videoRef.current) return;
  const video = videoRef.current;

  const detections = await model.detect(video);
  setDetections(calculateDetections(detections));
};
