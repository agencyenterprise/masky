import React, { useState, useEffect, useRef, useCallback } from "react";

import * as tf from "@tensorflow/tfjs";

const loadModel = (): Promise<tf.LayersModel> => {
  return tf.loadLayersModel("model/model.json");
};

function App() {
  const model = useModel();
  const videoRef = useWebcam();
  const [prediction, startPredicting] = usePrediction(model, videoRef);

  return (
    <div className="App">
      <video autoPlay ref={videoRef} onLoadedData={startPredicting} />
      {JSON.stringify(prediction, null, 2)}
    </div>
  );
}

const useModel = () => {
  const [model, setModel] = useState<tf.LayersModel | null>(null);

  useEffect(() => {
    loadModel().then(setModel);
  }, []);

  return model;
};

export default App;

const usePrediction = (
  model: tf.LayersModel | null,
  videoRef: React.MutableRefObject<HTMLVideoElement | null>
) => {
  const [prediction, setPrediction] = useState<any>(null);

  const classify = useCallback(() => {
    if (!model || !videoRef.current) return;
    const video = videoRef.current;

    tf.tidy(() => {
      const image = tf.browser
        .fromPixels(video)
        .resizeBilinear([224, 224])
        .expandDims(0);

      const prediction = model.predict(image);

      const firstPrediction = Array.isArray(prediction)
        ? prediction[0]
        : prediction;

      const data = firstPrediction.dataSync();
      const face = data[0];
      const mask = data[1];

      setPrediction(face >= mask ? "face" : "mask");
    });
  }, [model, videoRef]);

  const onLoaded = useCallback(() => {
    setInterval(classify, 100);
  }, [classify]);

  return [prediction, onLoaded];
};

const useWebcam = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "user" } })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      });
  }, []);

  return videoRef;
};
