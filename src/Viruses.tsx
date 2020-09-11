import React, {
  FunctionComponent,
  Reducer,
  useEffect,
  useReducer,
} from "react";
import * as automl from "@tensorflow/tfjs-automl";

import { Detections, DetectionStatus } from "./lib/Detection";
import { Corona } from "./Corona";

interface Virus {
  x: number;
  y: number;
  dx: number;
  dy: number;
}

export interface VirusesProps {
  detections: Detections;
  videoRef: React.MutableRefObject<HTMLVideoElement | null>;
}

interface VirusesState {
  viruses: Virus[];
  detections: automl.Box[];
  video: { height: number; width: number };
}

type VirusesAction =
  | { type: "newVirus"; payload: Virus }
  | { type: "tick"; payload: number }
  | { type: "detections"; payload: Detections }
  | { type: "generate" }
  | { type: "video"; payload: { width: number; height: number } };

const SPEED = 40;
const VIRUS_FREQUENCY = 1000 * 0.5;

const reducer: Reducer<VirusesState, VirusesAction> = (state, action) => {
  switch (action.type) {
    case "newVirus": {
      return { ...state, viruses: [...state.viruses, action.payload] };
    }
    case "tick": {
      const viruses = state.viruses
        .filter(
          (virus) =>
            virus.x > 0 &&
            virus.x < state.video.width &&
            virus.y > 0 &&
            virus.y < state.video.height
        )
        .map((virus) => ({
          ...virus,
          x: virus.x + virus.dx * (1000 / action.payload),
          y: virus.y + virus.dy * (1000 / action.payload),
        }));
      return { ...state, viruses };
    }
    case "video": {
      return { ...state, video: action.payload };
    }
    case "generate": {
      const newViruses = state.detections.map(
        ({ top, left, height, width }) => {
          const angle = 2 * Math.PI * Math.random();
          const dx = SPEED * Math.cos(angle);
          const dy = SPEED * Math.sin(angle);

          return {
            x: randomChoice([left - 50, left + width + 50]),
            y: top + height * (2 / 3),
            dx,
            dy,
          };
        }
      );

      return {
        ...state,
        viruses: [...state.viruses, ...newViruses],
      };
    }
    case "detections": {
      const detections = action.payload.boxes
        .filter((box) => box.label === DetectionStatus.Face)
        .map((detection) => detection.box);

      return { ...state, detections };
    }
    default:
      throw new Error();
  }
};

const initialState = (): VirusesState => ({
  viruses: [],
  detections: [],
  video: {
    width: 0,
    height: 0,
  },
});

export const Viruses: FunctionComponent<VirusesProps> = ({
  detections,
  videoRef,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState());

  useDetections(detections, dispatch);
  useTick(dispatch);
  useGenerateViruses(dispatch);
  useVideo(videoRef, dispatch);

  const { viruses } = state;

  return (
    <>
      {viruses.map(({ x, y }) => (
        <Corona id={`${x}, ${y}`} x={x} y={y} />
      ))}
    </>
  );
};

const useTick = (dispatch: React.Dispatch<VirusesAction>): void => {
  useEffect(() => {
    const nextFrame = (time: number) => {
      dispatch({ type: "tick", payload: time });
      requestAnimationFrame(nextFrame);
    };

    const handle = requestAnimationFrame(nextFrame);

    return () => cancelAnimationFrame(handle);
  }, [dispatch]);
};

const useGenerateViruses = (dispatch: React.Dispatch<VirusesAction>) => {
  useEffect(() => {
    const handle = setInterval(() => {
      dispatch({ type: "generate" });
    }, VIRUS_FREQUENCY);

    return () => clearInterval(handle);
  }, [dispatch]);
};

const useDetections = (
  detections: Detections,
  dispatch: React.Dispatch<VirusesAction>
): void => {
  useEffect(() => {
    dispatch({ type: "detections", payload: detections });
  }, [detections, dispatch]);
};

const useVideo = (
  videoRef: React.MutableRefObject<HTMLVideoElement | null>,
  dispatch: React.Dispatch<VirusesAction>
) => {
  const width = videoRef.current?.videoWidth || 0;
  const height = videoRef.current?.videoHeight || 0;

  useEffect(() => {
    dispatch({ type: "video", payload: { width, height } });
  }, [width, height, dispatch]);
};

function randomChoice<T>(choices: T[]): T {
  const index = Math.floor(Math.random() * choices.length);
  return choices[index];
}
