import { useEffect, useMemo } from "react";

export interface UseAudioProps {
  src: string;
  playing: boolean;
}

export const useAudio = ({ src, playing }: UseAudioProps) => {
  const audio = useMemo(() => new Audio(src), [src]);

  useEffect(() => {
    if (playing) {
      audio.play();
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [audio, playing]);
};
