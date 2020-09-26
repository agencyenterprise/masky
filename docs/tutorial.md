# Easy client-side inference with AutoML and React

Neural-network-based object detection is a powerful technique that's getting easier and easier to take advantage of. With Google's Cloud AutoML computer vision service, it's now surprisingly easy and cheap to train up a powerful object detection model, and deploy it as a client-side React app. And best of all, you don't need to write a data scientist to do it - the model training is code-free, so any application developer can train up a model and focus on doing what they do best, which is building useful and fun applications!

Given the current situation with COVID-19, we thought it would be an interesting test case to try building a mask detector - something that could take a video stream, and report back on the locations of people in a frame who are wearing masks, and of those who aren't. This could potentially be pretty useful to deploy in business trying to enforce mask mandates, and ride sharing services are already using something similar to check that drivers are wearing masks.

To keep it light though, in this case the detector isn't reporting anything to anyone - we'll just visualize what's going on in the world by showing the device's webcam stream, and having little COVID viruses come out of the mouths of non-masked faces, and little health icons hover over masked faces.

If you want to skip the explanations and jump into the code, you can find the deployed project at [masky.surge.sh](https://masky.surge.sh), and the repo [on GitHub](https://github.com/agencyenterprise/masky).

## Model creation

The basic workflow is simple. First you upload example images of each object type you want to detect (in this case, people wearing masks and people without masks). The more images the better, but because AutoML uses [transfer learning]() from a pre-trained object detection model, even just 30 examples for each class will probably give you decent results, though a hundred of each class would be better. Once you've uploaded the images, you manually draw bounding boxes around the objects (faces in our case) in each image, and mark each bounding box with its associated class. After all your data is labeled, you just tell Google to train the model, and come back in a couple hours. When it's done, you can either deploy the model as an API, or download it as a TensorFlow.js model and use it for client-side detection. The second option is what we'll focus on today.

Before you create a model, you'll have to set up a Google Cloud project, add billing, and enable the AutoML and Cloud Storage APIs. You can follow Google's [edge device model quickstart docs](https://cloud.google.com/vision/automl/docs/edge-quickstart) to get all that set up. You do have to provide a credit card to enable the API, but the first 15 node hours (training is run on multiple nodes in parallel) of training is free (see the [pricing docs](https://cloud.google.com/vision/automl/pricing#automl-vision-edge)). You can train a basic model in a few node hours, so the first few training runs will be free, and it's \$18 per node hour after that.

Once you've got the AutoML Vision set up, you can start adding images! Sourcing the right images can be the hardest part of training up a model. [Flikr](https://www.flickr.com/) is a good source for Creative-Commons-licensed images. Depending on what objects you're trying to detect, you could also take the images yourself. In either case, make sure you get a verity of angles and backgrounds, to make sure the model has a robust training set to learn from. And if you're doing something like face detection, make sure you train on a diverse set of people, or your model won't perform well on everyone.

With your images collected, you can upload them and start labeling them. Create a new dataset, and choose Object Detection. Classification can also be useful if you don't need the specific location of the detected items, but for any kind of AR experience you're probably going to want those bounding boxes.

![Create Dataset](./create_dataset.png)

Next, click on your new dataset and go to the Import tab. This will let you upload the new images. If there's in an existing Google Storage bucket, you can import them directly too.

![Import](./import.png)

With the images imported, go to the Images tab, click on an image, and start drawing bounding boxes! Make sure to pick the correct label in the top left area of the screen. If there are multiple objects in the image, you can mark each one with its own bounding box.

![Bounding Boxes](./bounding_boxes.png)

Finally, it's time to train you model! Go to the Train tab, and click Start Training. You'll have to pick either a Cloud Hosted or Edge model. For this tutorial you want Edge, since we'll be running inferences on the user's device. I'd also pick "Optimize for faster predictions", since inferences will be running pretty frequently on the video stream. Finally you'll have to pick a node hour budget. When getting started, I'd go for only an hour or two, to keep in the free tier. If you have more budget, then you can go for a full 24 hours. In any case, the training will stop as soon as the model converges, and you'll only be billed for the hours you actually use.

Finally, click Start Training! You'll get an email when it's done. In the meantime, you can go do something else, or start looking at the React half of the project! Once you get that email, congrats, you just trained a neural network!

The last step is to actually get the model. Click the TensorFlow.js option on the Test & Use tab, and export it to a bucket. You can then download it and add it to your react project. Or, just [make the bucket public](), and reference it directly from your React code! Speaking of which, it's now time to start writing some React.

## React app

Step one with a React project, as always, [Create React App](). We'll call the project Masky, so the command is `npx create-react-app masky` (or `npx create-react-app masky --template typescript`, if you want a TypeScript app).

Then, you'll need to add [tfjs]() for client-side inference, and [tfjs-automl]() to use the AutoML model.

```bash
yarn add @tensorflow/tfjs @tensorflow/tfjs-automl
```

The basic flow of a webcam-connected TF.js app works like this - you set connect to the user's webcam, and send the stream to a `video` element. Once the webcam is connected, you start a timer to periodically send a `ref` of the `video` element to the model. It'll report back with the locations of detected objects (if any). Then you can use that data to show a message on the screen, or use SVGs to render bounding boxes, little COVID viruses, or whatever you want on top of the video. So there's some state to manage here, and because the setup process takes a few seconds you'll probably want to show status messages to the user, so they don't think the app is broken. Let's get to work!

## Initialize the camera

While training is happening, you can start by adding a `video` element, plus some styling to make it take up the whole screen but leave room for status messages. The video stream will be different dimensions depending of the device, so it's a good idea to use absolute positioning to center it in a parent `div`. Also make sure to add `autoPlay`, `muted`, and `playsInline` to the `video` element, or the video stream won't actually start.

This example code uses [Styled Components](), but feel free to use whatever styling solution you'd like.

```tsx
import React from "react";
import styled, { createGlobalStyle } from "styled-components/macro";

const modelUrl = `https://storage.googleapis.com/path/to/model.json`;

export const App: React.FunctionComponent = () => {
  return (
    <PredictionWrapper detections={detectedObjects}>
      <GlobalStyle />
      <Message size="h1">Masky</Message>
      <VideoContainer>
        <Video autoPlay muted playsInline />
      </VideoContainer>

      <Message size="h2">{status}</Message>
    </PredictionWrapper>
  );
};

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 16px
  }

  body {
    margin: 0;
    font-family: sans-serif;
  }

  html, body, #root {
    height: 100%;
  }

  * {
    box-sizing: border-box;
  }
`;

const PredictionWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const VideoContainer = styled.div`
  position: relative;
  flex-grow: 1;
  flex-shrink: 1;
`;

const Video = styled.video`
  position: absolute;
  width: 100%;
  height: 100%;
  transform: scaleX(-1);
  flex-grow: 1;
`;

const MessageSize = {
  h1: "3rem",
  h2: "2rem",
  p: "1rem",
};

interface MessageProps {
  size: keyof typeof MessageSize;
}

const Message = styled.div<MessageProps>`
  padding: 1rem 0;
  color: white;
  font-size: ${({ size }) => MessageSize[size]};
  text-align: center;
`;
```

With the styling out of the way, we can actually get the webcam stream set up. That'll require another hook, which will handle connecting to the camera, and connecting the camera to the video element's `ref`.

This will use `navigator.mediaDevices.getUserMedia({video: { facingMode: 'user' }})` to get the video stream.
The `facingMode` tells the browser which camera to use (if the device has more than one, like a smartphone). Then we'll create a `HTMLVideoElement` ref that we'll pass to the `video` element, and will use that to pass the camera stream to the `video`.

Finally, the hook will return the `ref` to be sent to the `video`, and a `status` string that's helpful for letting the user know how the setup process is going. There's also a little error handling code, but in practice I haven't seen any errors.

```typescript
import { useRef, useEffect, useState } from "react";

export type WebcamStatus = "waiting" | "connected" | "failed";

const defaultVideoConstraints = { facingMode: "user" };

export const useWebcam = (
  videoConstraints: MediaTrackConstraints = defaultVideoConstraints
): [React.MutableRefObject<HTMLVideoElement | null>, WebcamStatus] => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [status, setStatus] = useState<WebcamStatus>("waiting");

  useEffect(() => {
    // Get video stream
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
```

With that code written, we can add the hook to the `App` component, and pass the `ref` to the `<video>`.

```tsx
import React from "react";

import { useWebcam } from "./lib/useWebcam";

export const App: React.FunctionComponent = () => {
  // use the new hook
  const [videoRef, status] = useWebcam();

  return (
    <PredictionWrapper>
      <GlobalStyle />
      <Message size="h1">Masky</Message>
      <VideoContainer>
        <Video
          autoPlay
          muted
          playsInline
          // Pass the ref to the video.
          ref={videoRef}
        />
      </VideoContainer>

      <Message size="h2">{status}</Message>
    </PredictionWrapper>
  );
};
```

Now run `yarn start` to serve the app, and you should see yourself. Hello world!

![Video Stream](./video_stream)

### Load the model

So now you can see yourself, give yourself a high five! But we still don't know if you're wearing your mask or not. Let's fix that. To do this next part, you'll need a trained model, so you'll have to wait for that to finish.

`tfjs-automl` is really simple to use, and loading the model is no exception. You just have to call `automl.loadObjectDetection`, which will return a Promise of a model. A simple React hook will do the job nicely:

```typescript
// src/lib/useDetectionModel.ts

import { useState, useEffect } from "react";
import * as automl from "@tensorflow/tfjs-automl";

export const useDetectionModel = (
  modelUrl: string
): automl.ObjectDetectionModel | null => {
  const [model, setModel] = useState<automl.ObjectDetectionModel | null>(null);

  useEffect(() => {
    automl.loadObjectDetection(modelUrl).then(setModel);
  }, [modelUrl]);

  return model;
};
```

You just need to pass the URL of the `model.json` to `useDetectionModel`. The `model.json` will then tell the library about the other files it'll need to download. If you're hosting the model in a Google Storage bucket, then you can pass it's URL in. Otherwise, you can add the model to the `public` directory of the app and pass a relative URL here.

```tsx
// src/App.tsx

import React from "react";

import { useDetectionModel } from "./lib/useDetectionModel";

const modelUrl = `https://storage.googleapis.com/path/to/model.json`;

export const App: React.FunctionComponent = () => {
  const detectionModel = useDetectionModel(modelUrl);

  return <PredictionWrapper>{/* ... */}<PredictionWrapper>
};
```

When you refresh the page, you should now see the `model.json`, a `dict.txt`, and some `shard` files get downloaded. You're ready to detect!

## Start Detecting

Now that the model is loaded and the camera is connected, it's time to bring them together. The automl library makes it pretty easy, but there's still some work to do to manage the state. So it's time for another custom hook. This one will take the `videoRef` that we'll use to get frames from, the model, and an interval to run the model on. Detection is pretty fast, but no so fast that you'll want to run it on every frame. I found once a second to be fine for this application.

The first thing to deal with is that you can't start detecting until the camera and video and initialized - otherwise the model will throw an error. So we'll add a `useState` hook to track when the video is ready, as well as a `useState` for actually holding the current detection state.

```typescript
export type PredictedObjects = automl.PredictedObject[] | null;

export const useDetection = (
  model: automl.ObjectDetectionModel | null,
  videoRef: React.MutableRefObject<HTMLVideoElement | null>,
  detectionInterval = DEFAULT_DETECTIONS_TIME
): [automl.PredictedObject[] | null, () => void] => {
  const [detections, setDetections] = useState<PredictedObjects>(null);
  const [videoReady, setVideoReady] = useState(false);

  const onVideoReady = useCallback(() => setWebcamReady(true), [setVideoReady]);

  return [detections, onVideoReady];
};
```

Then you can just call `onVideoReady` when the `video` is initialized:

```tsx
import React from "react";

import { useWebcam } from "./lib/useWebcam";

export const App: React.FunctionComponent = () => {
  // ...
  // Use the new hook
  const [detections, onVideoReady] = useDetection();

  return (
    <PredictionWrapper>
      {/* ... */}
      <Video
        autoPlay
        muted
        playsInline
        ref={videoRef}
        // Record when the video is ready
        onLoadedData={onVideoReady}
      />
      {/* ... */}
    </PredictionWrapper>
  );
};
```

With that bit of state management set up, we can actually start doing detections. It's surprisingly straightforward - using `setInterval`, just call `model.detect` with `videoRef.current` on a timer, and save the result with `setDetections`. It really couldn't be simpler.

```typescript
export const useDetection = (
  model: automl.ObjectDetectionModel | null,
  videoRef: React.MutableRefObject<HTMLVideoElement | null>,
  detectionInterval = DEFAULT_DETECTIONS_TIME
): [PredictedObjects, () => void] => {
  const [detections, setDetections] = useState<PredictedObjects>(null);
  const [videoReady, setVideoReady] = useState(false);

  const onVideoReady = useCallback(() => setVideoReady(true), [setVideoReady]);

  useEffect(() => {
    const video = videoRef.current;
    // Only run detections after the video and model are initialized.
    if (!videoReady || !model || !video) return;

    // Run detections and save their state.
    const handle = setInterval(
      () => model.detect(video).then(setDetections),
      detectionInterval
    );

    // Clean up the interval if the useEffect is re-run.
    return () => {
      clearInterval(handle);
    };
  }, [videoReady, detectionInterval, model, videoRef, setDetections]);

  return [detections, onVideoReady];
};
```

There is one more thing to think about - the first prediction actually takes a few seconds while the model warms up, but after that it's much faster. So to speed things up, we can "warm up" the model while the video is connecting, and then it'll be ready to immediately start doing quick detections. To do that, you just need to pass an empty tensor to the model:

```typescript
const warmUp = (model: automl.ObjectDetectionModel) => {
  const dummyImage = tf.zeros<tf.Rank.R3>([3, 3, 3]);
  model.detect(dummyImage);
};
```

and then call that function in a `useEffect` when the model is set up:

```typescript
export const useDetection = (
  model: automl.ObjectDetectionModel | null,
  videoRef: React.MutableRefObject<HTMLVideoElement | null>,
  detectionInterval = DEFAULT_DETECTIONS_TIME
): [PredictedObjects, () => void] => {
  const [detections, setDetections] = useState<PredictedObjects>(null);
  const [videoReady, setVideoReady] = useState(false);

  const onVideoReady = useCallback(() => setVideoReady(true), [setVideoReady]);

  // Warm up model while the camera is connecting.
  useEffect(() => {
    if (model) {
      warmUp(model);
    }
  }, [model]);

  useEffect(() => {
    const video = videoRef.current;
    if (!videoReady || !model || !video) return;

    const handle = setInterval(
      () => model.detect(video).then(setDetections),
      detectionInterval
    );

    return () => {
      clearInterval(handle);
    };
  }, [videoReady, detectionInterval, model, videoRef, setDetections]);

  return [detections, onVideoReady];
};
```

And that's it! Add a `console.log(detections)` to the hook, and when the app reloads, you should see it connect, and then start logging bounding box locations, tagged as either `face` or `mask`. Neat!

## Drawing bounding boxes

So getting the detection locations is cool, but the user can't actually see them yet. For that, we're going to have to draw something on the screen. The easiest first step is to just draw a box around the faces. You could do that with simple divs or a canvas, but an easy approach is with an inline SVG.
