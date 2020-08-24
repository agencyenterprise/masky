import { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";

export const useModels = () => {
  const [model, setModel] = useState<tf.LayersModel | null>(null);

  useEffect(() => {
    loadModel().then(setModel);
  }, []);

  return model;
};

const loadModel = (): Promise<tf.LayersModel> => {
  return tf.loadLayersModel("model/model.json");
};
