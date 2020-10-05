import React, {
  FunctionComponent,
  Reducer,
  useEffect,
  useReducer,
} from "react";
import { PredictedObject } from "@tensorflow/tfjs-automl";

import corona from "../assets/corona.svg";
import health from "../assets/health.svg";

interface ArObject {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  url: string;
}

export interface ArObjectsProps {
  detections: PredictedObject[];
  videoRef: React.MutableRefObject<HTMLVideoElement | null>;
}

interface ArObjectsState {
  objects: ArObject[];
  detections: PredictedObject[];
  video: { height: number; width: number };
}

interface VideoDimensions {
  width: number;
  height: number;
}

type Action<Type extends string, Payload> = {
  type: Type;
  payload: Payload;
};

type EmptyAction<Type extends string> = {
  type: Type;
};

type ArObjectsAction =
  | Action<"tick", number>
  | Action<"detections", PredictedObject[]>
  | Action<"video", VideoDimensions>
  | EmptyAction<"generate">;

const SPEED = 40;
const SPAWN_FREQUENCY = 1000 * 0.5;
const MAX_AR_OBJECTS = 20;

const reducer: Reducer<ArObjectsState, ArObjectsAction> = (state, action) => {
  switch (action.type) {
    case "tick": {
      const objects = state.objects
        .filter(
          (object) =>
            object.x > 0 &&
            object.x < state.video.width &&
            object.y > 0 &&
            object.y < state.video.height
        )
        .slice(0, MAX_AR_OBJECTS)
        .map((object) => ({
          ...object,
          x: object.x + object.dx * (1000 / action.payload),
          y: object.y + object.dy * (1000 / action.payload),
        }));
      return { ...state, objects };
    }
    case "video": {
      return { ...state, video: action.payload };
    }
    case "generate": {
      const newArObjects = state.detections.map(newArObject);

      return {
        ...state,
        objects: [...newArObjects, ...state.objects],
      };
    }
    case "detections": {
      return { ...state, detections: action.payload };
    }
    default:
      throw new Error();
  }
};

const initialState = (): ArObjectsState => ({
  objects: [],
  detections: [],
  video: {
    width: 0,
    height: 0,
  },
});

export const ArObjects: FunctionComponent<ArObjectsProps> = ({
  detections,
  videoRef,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState());

  useDetections(detections, dispatch);
  useTick(dispatch);
  useGenerateArObjects(dispatch);
  useVideo(videoRef, dispatch);

  const { objects } = state;

  return (
    <>
      {objects.map(({ id, x, y, url }) => (
        <image key={id} x={x} y={y} href={url} height={20} width={20} />
      ))}
    </>
  );
};

const useTick = (dispatch: React.Dispatch<ArObjectsAction>): void => {
  useEffect(() => {
    const nextFrame = (time: number) => {
      dispatch({ type: "tick", payload: time });
      requestAnimationFrame(nextFrame);
    };

    const handle = requestAnimationFrame(nextFrame);

    return () => cancelAnimationFrame(handle);
  }, [dispatch]);
};

const useGenerateArObjects = (dispatch: React.Dispatch<ArObjectsAction>) => {
  useEffect(() => {
    const handle = setInterval(() => {
      dispatch({ type: "generate" });
    }, SPAWN_FREQUENCY);

    return () => clearInterval(handle);
  }, [dispatch]);
};

const useDetections = (
  detections: PredictedObject[],
  dispatch: React.Dispatch<ArObjectsAction>
): void => {
  useEffect(() => {
    dispatch({ type: "detections", payload: detections });
  }, [detections, dispatch]);
};

const useVideo = (
  videoRef: React.MutableRefObject<HTMLVideoElement | null>,
  dispatch: React.Dispatch<ArObjectsAction>
) => {
  const width = videoRef.current?.videoWidth || 0;
  const height = videoRef.current?.videoHeight || 0;

  useEffect(() => {
    dispatch({ type: "video", payload: { width, height } });
  }, [width, height, dispatch]);
};

const newArObject = ({
  label,
  box: { top, left, height, width },
}: PredictedObject): ArObject => {
  if (label === "face") {
    const angle = 2 * Math.PI * Math.random();
    const dx = SPEED * Math.cos(angle);
    const dy = SPEED * Math.sin(angle);

    return {
      id: uniqueId(),
      url: corona,
      x: left + width / 2,
      y: top + height * (2 / 3),
      dx,
      dy,
    };
  } else {
    return {
      id: uniqueId(),
      url: health,
      x: left + width * Math.random(),
      y: top - 10,
      dx: 0,
      dy: -SPEED,
    };
  }
};

export const negativeOneToPositiveOne = () => {
  const positive = Math.random() > 0.5;
  return Math.random() * (positive ? 1 : -1);
};

let id = 0;
const uniqueId = () => id++;
