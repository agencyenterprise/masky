import React from "react";
import styled, { createGlobalStyle } from "styled-components/macro";

import { useDetection } from "./lib/useDetection";
import { useWebcam } from "./lib/useWebcam";
import { useDetectionModel } from "./lib/useModels";
import { getMessage } from "./lib/message";
import {
  Detections,
  DetectionColor,
  calculateDetections,
} from "./lib/Detection";
import { ArObjects } from "./components/ArObjects";

const modelUrl = `${process.env.REACT_APP_MODEL_URL}/model.json`;

export const App: React.FunctionComponent = () => {
  const detectionModel = useDetectionModel(modelUrl);
  const [videoRef, status] = useWebcam();
  const [detections, onWebcamReady] = useDetection(detectionModel, videoRef);

  const d = calculateDetections(detections);

  return (
    <PredictionWrapper detections={d}>
      <GlobalStyle />
      <Message size="h1">Masky</Message>
      <WebcamContainer>
        <Webcam
          autoPlay
          muted
          playsInline
          ref={videoRef}
          onLoadedData={onWebcamReady}
        />

        {videoRef.current && (
          <SvgContainer
            viewBox={`0 0 ${videoRef.current?.videoWidth} ${videoRef.current?.videoHeight}`}
          >
            <ArObjects detections={d} videoRef={videoRef} />
          </SvgContainer>
        )}
      </WebcamContainer>

      <Message size="h2">{getMessage(d, status)}</Message>
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
  detections: Detections;
}

const PredictionWrapper = styled.div<PredictionWrapperProps>`
  width: 100%;
  height: 100%;
  background-color: ${({ detections }) => DetectionColor[detections.status]};
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

const SvgContainer = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: scaleX(-1);
`;

const Webcam = styled.video`
  position: absolute;
  width: 100%;
  height: 100%;
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
