import { useRef, useEffect, useState } from "react";

export type WebcamStatus = "waiting" | "connected" | "failed";

const defaultVideoConstraints = { facingMode: "user" };

export const useWebcam = (
  started = true,
  videoConstraints: MediaTrackConstraints = defaultVideoConstraints
): [React.MutableRefObject<HTMLVideoElement | null>, WebcamStatus] => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [status, setStatus] = useState<WebcamStatus>("waiting");

  useEffect(() => {
    if (!started) return;
    navigator.mediaDevices
      .getUserMedia({ video: videoConstraints })
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
  }, [started, videoConstraints]);

  return [videoRef, status];
};
