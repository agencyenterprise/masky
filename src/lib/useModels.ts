import { useState, useEffect } from "react";
import * as automl from "@tensorflow/tfjs-automl";

export const useDetectionModel = () => {
  const [model, setModel] = useState<automl.ObjectDetectionModel | null>(null);

  useEffect(() => {
    loadDetectionModel().then(setModel);
  }, []);

  return model;
};

const loadDetectionModel = (): Promise<automl.ObjectDetectionModel> => {
  return automl.loadObjectDetection(
    `${process.env.REACT_APP_MODEL_URL}/model.json`
  );
};
