/** @jsx jsx */
import { jsx } from "@emotion/core";
import { FunctionComponent } from "react";
import { Flex, Box, Text, Link } from "rebass";

export const Footer: FunctionComponent = () => {
  return (
    <Flex justifyContent="space-between" px={4} py={2}>
      <Box flex="1 0 0" />
      <Box>
        <Text color="primary" textAlign="center" variant="body">
          Made with{" "}
          <span role="img" aria-label="love">
            ❤️
          </span>
          &nbsp; by &nbsp;
          <Link href="https://ae.studio">AE Studio</Link>
        </Text>
      </Box>
      <Box flex="1 0 0">
        <Link href="#about">
          <Text color="primary" variant="body" textAlign="right">
            About
          </Text>
        </Link>
      </Box>
    </Flex>
  );
};
