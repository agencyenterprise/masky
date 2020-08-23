import { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as faceapi from "face-api.js";

export const useModels = () => {
  const [model, setModel] = useState<tf.LayersModel | null>(null);

  useEffect(() => {
    loadFaceModel();
    loadModel().then(setModel);
  }, []);

  return model;
};

const loadFaceModel = (): Promise<void> => {
  return faceapi.nets.tinyFaceDetector.loadFromUri("tiny");
};

const loadModel = async (): Promise<tf.LayersModel> => {
  await loadFaceModel();
  return tf.loadLayersModel("model/model.json");
};
