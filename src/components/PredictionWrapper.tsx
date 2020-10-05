/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Flex } from "rebass";
import { FunctionComponent } from "react";

import { DetectionColor, DetectionStatus } from "../lib/getDetectionStatus";

export interface PredictionWrapperProps {
  status: DetectionStatus;
}

export const PredictionWrapper: FunctionComponent<PredictionWrapperProps> = ({
  status,
  children,
}) => {
  return (
    <Flex
      bg={DetectionColor[status]}
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
