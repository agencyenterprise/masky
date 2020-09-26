/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { Box, Text, Flex, Image } from "rebass";
import { FunctionComponent } from "react";

import { useDetection } from "../lib/useDetection";
import { useWebcam } from "../lib/useWebcam";
import { useDetectionModel } from "../lib/useDetectionModel";
import { getMessage } from "../lib/message";
import {
  Detections,
  DetectionColor,
  calculateDetections,
} from "../lib/Detection";
import { ArObjects } from "./ArObjects";
import { Footer } from "./Footer";
import logo from "../assets/logo.svg";

const modelUrl = `${process.env.REACT_APP_MODEL_URL}/model.json`;

export const Detector: FunctionComponent = () => {
  const detectionModel = useDetectionModel(modelUrl);
  const [videoRef, status] = useWebcam();
  const [detections, onVideoReady] = useDetection(
    detectionModel,
    videoRef,
    500
  );

  const detectedObjects = calculateDetections(detections);

  return (
    <PredictionWrapper detections={detectedObjects}>
      <Flex justifyContent="center" alignItems="center" p={2}>
        <Image height={[40, 60, 80]} mr={3} src={logo} />
        <Text color="primary" textAlign="center" variant="display">
          Doctor Masky
        </Text>
      </Flex>

      <VideoContainer>
        <Video
          autoPlay
          muted
          playsInline
          hide={!detections}
          ref={videoRef}
          onLoadedData={onVideoReady}
        />

        {videoRef.current && (
          <SvgContainer
            viewBox={`0 0 ${videoRef.current?.videoWidth} ${videoRef.current?.videoHeight}`}
          >
            <ArObjects detections={detectedObjects} videoRef={videoRef} />
          </SvgContainer>
        )}
      </VideoContainer>

      <Box>
        <Text
          fontSize={[3, 4, 5]}
          color="primary"
          textAlign="center"
          variant="heading"
          paddingY={3}
        >
          {getMessage(detectedObjects, status)}
        </Text>

        <Footer />
      </Box>
    </PredictionWrapper>
  );
};

interface PredictionWrapperProps {
  detections: Detections;
}

const PredictionWrapper: FunctionComponent<PredictionWrapperProps> = ({
  detections,
  children,
}) => {
  return (
    <Flex
      bg={DetectionColor[detections.status]}
      width="100%"
      height="100%"
      flexDirection="column"
      justifyContent="space-between"
      sx={{
        position: "relative",
      }}
    >
      {children}
    </Flex>
  );
};

const VideoContainer = styled.div`
  position: relative;
  flex-grow: 1;
  flex-shrink: 1;
`;

const Video = styled.video<{ hide: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
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
  transform: scaleX(-1);
`;
