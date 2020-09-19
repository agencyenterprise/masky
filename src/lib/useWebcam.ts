import { useRef, useEffect, useState } from "react";

export type WebcamStatus = "waiting" | "connected" | "failed";

const defaultVideoConstraints = { facingMode: "user" };

export const useWebcam = (
  videoConstraints: MediaTrackConstraints = defaultVideoConstraints
): [React.MutableRefObject<HTMLVideoElement | null>, WebcamStatus] => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [status, setStatus] = useState<WebcamStatus>("waiting");

  useEffect(() => {
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
  }, [videoConstraints]);

  return [videoRef, status];
};
