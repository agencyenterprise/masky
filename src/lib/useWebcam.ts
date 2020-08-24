import { useRef, useEffect, useState, useCallback } from "react";

export enum WebcamStatus {
  Waiting = "waiting",
  Connected = "connected",
  Failed = "failed",
  Ready = "ready",
}

export const WebcamStatusMessage = {
  [WebcamStatus.Waiting]: "Waiting for camera...",
  [WebcamStatus.Connected]: "Starting predictions...",
  [WebcamStatus.Failed]: "Couldn't connect to camera.",
  [WebcamStatus.Ready]: "Setting up model...",
};

export const useWebcam = (): [
  React.MutableRefObject<HTMLVideoElement | null>,
  WebcamStatus,
  () => void
] => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [status, setStatus] = useState<WebcamStatus>(WebcamStatus.Waiting);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "user" } })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setStatus(WebcamStatus.Connected);
        } else {
          console.error("Webcam connected before video was ready.");
          setStatus(WebcamStatus.Failed);
        }
      })
      .catch((error) => {
        console.error(error);
        setStatus(WebcamStatus.Failed);
      });
  }, []);

  const onReady = useCallback(() => setStatus(WebcamStatus.Ready), []);

  return [videoRef, status, onReady];
};
