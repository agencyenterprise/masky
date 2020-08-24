import { useRef, useEffect, useState } from "react";

export enum WebcamStatus {
  Waiting = "waiting",
  Connected = "connected",
  Failed = "failed",
}

export const useWebcam = (): [
  React.MutableRefObject<HTMLVideoElement | null>,
  WebcamStatus
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

  return [videoRef, status];
};
