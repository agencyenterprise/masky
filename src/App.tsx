import React from "react";
import styled, { createGlobalStyle } from "styled-components/macro";

import { usePrediction } from "./lib/usePrediction";
import { useWebcam } from "./lib/useWebcam";
import { useModels } from "./lib/useModels";
import { Prediction, PredictionColor } from "./lib/Prediction";
import { getMessage } from "./lib/message";

export const App: React.FunctionComponent = () => {
  const model = useModels();
  const [videoRef, status, onVideoLoaded] = useWebcam();
  const prediction = usePrediction(model, videoRef, status);

  const loaded = prediction !== Prediction.Loading;

  return (
    <PredictionWrapper prediction={prediction}>
      <GlobalStyle />
      <Message size="h1">Mask Detector</Message>

      <WebcamContainer>
        <Webcam
          autoPlay
          muted
          playsInline
          ref={videoRef}
          onLoadedData={onVideoLoaded}
          loaded={loaded}
        />
      </WebcamContainer>

      <Message size="h2">{getMessage(prediction, status)}</Message>
    </PredictionWrapper>
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

  html, body, #root {
    height: 100%;
  }

  * {
    box-sizing: border-box;
  }
`;

interface PredictionWrapperProps {
  prediction: Prediction;
}

const PredictionWrapper = styled.div<PredictionWrapperProps>`
  width: 100%;
  height: 100%;
  border-width: 0.5rem;
  border-style: solid;
  border-color: ${({ prediction }) => PredictionColor[prediction]};
  background: black;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const WebcamContainer = styled.div`
  position: relative;
  flex-grow: 1;
  flex-shrink: 1;
`;

interface WebcamProps {
  loaded: boolean;
}

const Webcam = styled.video<WebcamProps>`
  position: absolute;
  width: 100%;
  height: 100%;
  display: ${({ loaded }) => (loaded ? "block" : "none")};
  transform: scaleX(-1);
  flex-grow: 1;
`;

const MessageSize = {
  h1: "3rem",
  h2: "2rem",
  p: "1rem",
};

interface MessageProps {
  size: keyof typeof MessageSize;
}

const Message = styled.div<MessageProps>`
  padding: 1rem 0;
  color: white;
  font-size: ${({ size }) => MessageSize[size]};
  text-align: center;
`;
