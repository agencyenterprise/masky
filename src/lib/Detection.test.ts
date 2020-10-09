import { PredictedObject } from "@tensorflow/tfjs-automl";

import { getDetectionStatus } from "./getDetectionStatus";

const predictedObject: PredictedObject = {
  label: "mask",
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
        label: "mask",
      },
    ];

    const status = getDetectionStatus(detections);

    expect(status).toBe("mask");
  });

  it("handles mask detections", () => {
    const detections: PredictedObject[] = [
      {
        ...predictedObject,
        label: "face",
      },
    ];

    const status = getDetectionStatus(detections);

    expect(status).toBe("face");
  });

  it("handles both detections", () => {
    const detections: PredictedObject[] = [
      {
        ...predictedObject,
        label: "face",
      },
      {
        ...predictedObject,
        label: "mask",
      },
    ];

    const status = getDetectionStatus(detections);

    expect(status).toBe("both");
  });
});
