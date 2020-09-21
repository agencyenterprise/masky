import { useState, useEffect } from "react";
import * as automl from "@tensorflow/tfjs-automl";

export const useDetectionModel = (
  modelUrl: string
): automl.ObjectDetectionModel | null => {
  const [model, setModel] = useState<automl.ObjectDetectionModel | null>(null);

  useEffect(() => {
    automl.loadObjectDetection(modelUrl).then(setModel);
  }, [modelUrl]);

  return model;
};
