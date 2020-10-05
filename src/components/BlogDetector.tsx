/** @jsx jsx */
import { jsx, Global } from "@emotion/core";
import css from "@emotion/css/macro";
import styled from "@emotion/styled/macro";
import { FunctionComponent } from "react";

import { getDetectionStatus } from "../lib/getDetectionStatus";
import { getMessage } from "../lib/message";
import { useDetection } from "../lib/useDetection";
import { useDetectionModel } from "../lib/useDetectionModel";
import { useWebcam } from "../lib/useWebcam";

const modelUrl = `${process.env.REACT_APP_MODEL_URL}/model.json`;

export const App: FunctionComponent = () => {
  const detectionModel = useDetectionModel(modelUrl);
  const [videoRef, status] = useWebcam();
  const [detections, onVideoReady] = useDetection(detectionModel, videoRef);

  const detectionStatus = getDetectionStatus(detections);

  return (
    <PredictionWrapper status={detectionStatus}>
      <GlobalStyle />
      <Message>Doctor Masky</Message>

      <VideoContainer>
        <Video
          autoPlay
          muted
          playsInline
          hide={!detections}
          ref={videoRef}
          onLoadedData={onVideoReady}
        />

        {videoRef.current && detections && (
          <SvgContainer
            viewBox={`0 0 ${videoRef.current.videoWidth} ${videoRef.current.videoHeight}`}
          >
            {detections.map((detection) => {
              const { box, label } = detection;
              const { left, top, width, height } = box;
              return (
                <rect
                  key={`${left}-${top}-${label}`}
                  x={left}
                  y={top}
                  width={width}
                  height={height}
                  stroke={detectionColor[label]}
                  fill="transparent"
                  strokeWidth="5"
                />
              );
            })}
          </SvgContainer>
        )}
      </VideoContainer>

      <Message>{getMessage(detectionStatus, status)}</Message>
    </PredictionWrapper>
  );
};

export const GlobalStyle = () => {
  return (
    <Global
      styles={css`
        html,
        body,
        #root {
          height: 100%;
        }

        body {
          margin: 0;
        }
      `}
    />
  );
};

export const detectionColor: Record<string, string> = {
  loading: "black",
  face: "red",
  mask: "green",
  both: "orange",
  none: "black",
};

const PredictionWrapper = styled.div<{ status: string }>`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${({ status }) => detectionColor[status]};
`;

const VideoContainer = styled.div`
  position: relative;
  flex-grow: 1;
  flex-shrink: 1;
`;

const Video = styled.video<{ hide: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  /* Flip video */
  transform: scaleX(-1);
  flex-grow: 1;
  display: ${({ hide }) => (hide ? "none" : "block")};
`;

const SvgContainer = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* Flip video */
  transform: scaleX(-1);
`;

const Message = styled.div`
  padding: 1rem 0;
  color: white;
  font-size: 3rem;
  text-align: center;
  font-family: sans-serif;
`;
