import { PredictedObject } from "@tensorflow/tfjs-automl";

import { DetectionClass, getDetectionStatus } from "./getDetectionStatus";

const predictedObject: PredictedObject = {
  label: DetectionClass.face,
  box: { height: 0, width: 0, left: 0, top: 0 },
  score: 90,
};

describe("getDetectionStatus", () => {
  it("handles empty detections", () => {
    const detections: PredictedObject[] = [];

    const status = getDetectionStatus(detections);

    expect(status).toBe("none");
  });

  it("handles mask detections", () => {
    const detections: PredictedObject[] = [
      {
        ...predictedObject,
        label: DetectionClass.mask,
      },
    ];

    const status = getDetectionStatus(detections);

    expect(status).toBe("mask");
  });

  it("handles mask detections", () => {
    const detections: PredictedObject[] = [
      {
        ...predictedObject,
        label: DetectionClass.face,
      },
    ];

    const status = getDetectionStatus(detections);

    expect(status).toBe("face");
  });

  it("handles both detections", () => {
    const detections: PredictedObject[] = [
      {
        ...predictedObject,
        label: DetectionClass.face,
      },
      {
        ...predictedObject,
        label: DetectionClass.mask,
      },
    ];

    const status = getDetectionStatus(detections);

    expect(status).toBe("both");
  });
});
