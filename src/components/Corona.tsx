import React, { FunctionComponent, SVGAttributes } from "react";

import corona from "../assets/corona.svg";

export const Corona: FunctionComponent<SVGAttributes<SVGImageElement>> = (
  props
) => <image {...props} width={20} height={20} href={corona} />;
