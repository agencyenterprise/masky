/** @jsx jsx */
import { jsx, Global, css } from "@emotion/core";

export const GlobalStyle = () => {
  return (
    <Global
      styles={css`
        body {
          margin: 0;
        }

        html {
          height: -webkit-fill-available;
        }
      `}
    />
  );
};
