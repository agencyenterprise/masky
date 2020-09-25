import React from "react";

import { About } from "./components/About";
import { GlobalStyle } from "./components/GlobalStyle";
import { CustomThemeProvider } from "./components/CustomThemeProvider";
import { Detector } from "./components/Detector";

export const App: React.FunctionComponent = () => {
  return (
    <CustomThemeProvider>
      <GlobalStyle />
      <Detector />
      <About />
    </CustomThemeProvider>
  );
};
