/** @jsx jsx */
import { jsx, Global, css } from "@emotion/core";

export const GlobalStyle = () => {
  return (
    <Global
      styles={css`
        html,
        body,
        #root {
          height: 100%;
        }

        body {
          margin: 0;
        }
      `}
    />
  );
};
