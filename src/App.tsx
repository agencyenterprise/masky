import React from "react";
import styled, { createGlobalStyle } from "styled-components/macro";

import { usePrediction } from "./lib/usePrediction";
import { useWebcam } from "./lib/useWebcam";
import { useModels } from "./lib/useModels";
import {
  Prediction,
  PredictionColor,
  PredictionMessage,
} from "./lib/Prediction";

export const App: React.FunctionComponent = () => {
  const model = useModels();
  const videoRef = useWebcam();
  const [prediction, startPredicting] = usePrediction(model, videoRef);

  const loaded = prediction !== Prediction.Loading;

  return (
    <div className="App">
      <GlobalStyle />
      <WebcamWrapper prediction={prediction}>
        <Message top size="h1">
          Mask Detector
        </Message>

        <Webcam
          autoPlay
          ref={videoRef}
          onLoadedData={startPredicting}
          loaded={loaded}
        />

        <Message bottom size="h2">
          {PredictionMessage[prediction]}
        </Message>
      </WebcamWrapper>
    </div>
  );
};

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 16px
  }

  body {
    margin: 0;
    font-family: sans-serif;
  }

  * {
    box-sizing: border-box;
  }
`;

interface WebcamWrapperProps {
  prediction: Prediction;
}

const WebcamWrapper = styled.div<WebcamWrapperProps>`
  width: 100vw;
  height: 100vh;
  border-width: 0.5rem;
  border-style: solid;
  border-color: ${({ prediction }) => PredictionColor[prediction]};
  background: black;
  position: relative;
`;

interface WebcamProps {
  loaded: boolean;
}

const Webcam = styled.video<WebcamProps>`
  width: 100%;
  height: 100%;
  display: ${({ loaded }) => (loaded ? "block" : "none")};
`;

const MessageSize = {
  h1: "3rem",
  h2: "2rem",
  p: "1rem",
};

interface MessageProps {
  size: keyof typeof MessageSize;
  top?: boolean;
  bottom?: boolean;
}

const Message = styled.div<MessageProps>`
  position: absolute;
  bottom: ${({ bottom }) => (bottom ? "1rem" : "auto")};
  top: ${({ top }) => (top ? "1rem" : "auto")};
  left: 50%;
  transform: translate(-50%, 0);
  color: white;
  font-size: ${({ size }) => MessageSize[size]};
  text-align: center;
`;
