import { PredictedObject } from "@tensorflow/tfjs-automl";

import { calculateDetections } from "./Detection";

describe("Detection", () => {
  describe("calculateDetections", () => {
    it("handles empty detections", () => {
      const detections: PredictedObject[] = [];

      const detectionObjects = calculateDetections(detections);

      expect(detectionObjects).toEqual({
        boxes: [],
        masks: 0,
        faces: 0,
        status: "none",
      });
    });
  });
});
