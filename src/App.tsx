import React from "react";
import styled, { createGlobalStyle } from "styled-components/macro";

import { useDetection } from "./lib/usePrediction";
import { useWebcam } from "./lib/useWebcam";
import { useDetectionModel } from "./lib/useModels";
import { getMessage } from "./lib/message";
import { Detections, DetectionColor, DetectionStatus } from "./lib/Detection";
import { Viruses } from "./Viruses";

export const App: React.FunctionComponent = () => {
  const detectionModel = useDetectionModel();
  const [videoRef, status, onVideoLoaded] = useWebcam();
  const detections = useDetection(detectionModel, videoRef, status);

  const loaded = detections.status !== DetectionStatus.Loading;

  return (
    <PredictionWrapper detections={detections}>
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

        {videoRef.current && (
          <BoundingBoxContainer
            viewBox={`0 0 ${videoRef.current?.videoWidth} ${videoRef.current?.videoHeight}`}
          >
            {detections.boxes.map((detection) => {
              const { box, label } = detection;
              const { left, top, width, height } = box;
              return (
                <rect
                  key={`${left}-${top}-${width}-${height}`}
                  x={left}
                  y={top}
                  width={width}
                  height={height}
                  stroke={DetectionColor[label as DetectionStatus]}
                  fill="transparent"
                  strokeWidth="5"
                />
              );
            })}

            <Viruses detections={detections} videoRef={videoRef} />
          </BoundingBoxContainer>
        )}
      </WebcamContainer>

      <Message size="h2">{getMessage(detections, status)}</Message>
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
  border-width: 0.5rem;
  border-style: solid;
  border-color: ${({ detections }) => DetectionColor[detections.status]};
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

const BoundingBoxContainer = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

interface WebcamProps {
  loaded: boolean;
}

const Webcam = styled.video<WebcamProps>`
  position: absolute;
  width: 100%;
  height: 100%;
  display: ${({ loaded }) => (loaded ? "block" : "none")};
  /* transform: scaleX(-1); */
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
