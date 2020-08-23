import React from "react";

import { usePrediction } from "./lib/usePrediction";
import { useWebcam } from "./lib/useWebcam";
import { useModels } from "./lib/useModels";

export const App: React.FunctionComponent = () => {
  const model = useModels();
  const videoRef = useWebcam();
  const [prediction, canvases, startPredicting] = usePrediction(
    model,
    videoRef
  );

  return (
    <div className="App">
      {canvases.map((canvas) => (
        <img alt="face" src={canvas.toDataURL()} />
      ))}
      <video autoPlay ref={videoRef} onLoadedData={startPredicting} />
      {JSON.stringify(prediction, null, 2)}
    </div>
  );
};
