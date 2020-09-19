import { useRef, useEffect, useState, useCallback } from "react";

export type WebcamStatus = "waiting" | "connected" | "failed" | "ready";

export const WebcamStatusMessage = {
  waiting: "Waiting for camera...",
  connected: "Starting predictions...",
  failed: "Couldn't connect to camera.",
  ready: "Setting up model...",
};

export const useWebcam = (): [
  React.MutableRefObject<HTMLVideoElement | null>,
  WebcamStatus,
  () => void
] => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [status, setStatus] = useState<WebcamStatus>("waiting");

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "user" } })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setStatus("connected");
        } else {
          console.error("Webcam connected before video was ready.");
          setStatus("failed");
        }
      })
      .catch((error) => {
        console.error(error);
        setStatus("failed");
      });
  }, []);

  const onReady = useCallback(() => setStatus("ready"), []);

  return [videoRef, status, onReady];
};
