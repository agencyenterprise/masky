import React, {
  FunctionComponent,
  Reducer,
  useEffect,
  useReducer,
} from "react";
import * as automl from "@tensorflow/tfjs-automl";

import { Detections, DetectionStatus } from "../lib/Detection";
import corona from "../assets/corona.svg";
import health from "../assets/health.svg";

interface ArObject {
  x: number;
  y: number;
  dx: number;
  dy: number;
  url: string;
}

export interface ArObjectsProps {
  detections: Detections;
  videoRef: React.MutableRefObject<HTMLVideoElement | null>;
}

interface ArObjectsState {
  objects: ArObject[];
  detections: automl.PredictedObject[];
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
  | Action<"detections", Detections>
  | Action<"video", VideoDimensions>
  | EmptyAction<"generate">;

const SPEED = 40;
const SPAWN_FREQUENCY = 1000 * 0.5;

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
        objects: [...state.objects, ...newArObjects],
      };
    }
    case "detections": {
      return { ...state, detections: action.payload.boxes };
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
      {objects.map(({ x, y, url }) => (
        <image
          id={`${x}, ${y}`}
          x={x}
          y={y}
          href={url}
          height={20}
          width={20}
        />
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
  detections: Detections,
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
}: automl.PredictedObject): ArObject => {
  if (label === DetectionStatus.Face) {
    const angle = 2 * Math.PI * Math.random();
    const dx = SPEED * Math.cos(angle);
    const dy = SPEED * Math.sin(angle);

    return {
      url: corona,
      x: left + width / 2,
      y: top + height * (2 / 3),
      dx,
      dy,
    };
  } else {
    return {
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
