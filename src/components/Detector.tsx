/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { Box, Text, Flex, Image, Button } from "rebass";
import { FunctionComponent, useState } from "react";

import { ArObjects } from "./ArObjects";
import { AudioIcon } from "./AudioIcon";
import { calculateDetections } from "../lib/Detection";
import { Footer } from "./Footer";
import { getMessage } from "../lib/message";
import { PredictionWrapper } from "./PredictionWrapper";
import { useAudio } from "../lib/useAudio";
import { useCanPlayAudio } from "../lib/useCanPlayAudio";
import { useDetection } from "../lib/useDetection";
import { useDetectionModel } from "../lib/useDetectionModel";
import { useWebcam } from "../lib/useWebcam";
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

  const [started, setStarted] = useState(false);

  const detectedObjects = calculateDetections(detections);

  const [canPlay, setCanPlay] = useCanPlayAudio();

  useAudio({
    src: "assets/coronavirus.mp3",
    playing: canPlay && detectedObjects.status === "face",
    started,
  });

  return (
    <PredictionWrapper detections={detectedObjects}>
      <AudioIcon audio={canPlay} onChange={setCanPlay} />

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
          hide={!detections || !started}
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

        {!started && (
          <ButtonContainer>
            <Button
              variant="primary"
              onClick={() => setStarted(true)}
              disabled={!detections}
            >
              {detections ? "Start" : "Loading..."}
            </Button>
          </ButtonContainer>
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
          {getMessage(detectedObjects, status, started)}
        </Text>

        <Footer />
      </Box>
    </PredictionWrapper>
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

const ButtonContainer: FunctionComponent = ({ children }) => {
  return (
    <Flex
      width="100%"
      height="100%"
      justifyContent="center"
      alignItems="center"
      sx={{
        top: "0",
        left: "0",
        position: "absolute",
      }}
    >
      {children}
    </Flex>
  );
};
