import { useState, useEffect } from "react";

export const useCanPlayAudio = (): [boolean, (canPlay: boolean) => void] => {
  const [canPlay, setCanPlay] = useState(initialState);

  useEffect(() => {
    window.localStorage.setItem("canPlay", canPlay.toString());
  }, [canPlay]);

  return [canPlay, setCanPlay];
};

const initialState = () => {
  const storedValue = window.localStorage.getItem("canPlay");

  if (!storedValue) return true;
  return storedValue === "true" ? true : false;
};
