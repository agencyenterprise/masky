/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Flex } from "rebass";
import { FunctionComponent } from "react";

import { Detections, DetectionColor } from "../lib/Detection";

export interface PredictionWrapperProps {
  detections: Detections;
}

export const PredictionWrapper: FunctionComponent<PredictionWrapperProps> = ({
  detections,
  children,
}) => {
  return (
    <Flex
      bg={DetectionColor[detections.status]}
      width="100%"
      height="100%"
      flexDirection="column"
      justifyContent="space-between"
      sx={{
        position: "relative",
      }}
    >
      {children}
    </Flex>
  );
};
