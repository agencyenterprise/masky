import { useEffect, useState } from "react";

export interface UseAudioProps {
  src: string;
  playing: boolean;
  started: boolean;
}

export const useAudio = ({ src, playing, started }: UseAudioProps) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (started) {
      setAudio(new Audio(src));
    }
  }, [started, src]);

  useEffect(() => {
    if (!audio) return;

    if (playing) {
      audio.play();
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [audio, playing]);
};
