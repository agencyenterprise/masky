/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { FunctionComponent } from "react";
import { Text } from "rebass";

export interface AudioIconProps {
  audio: boolean;
  onChange: (audio: boolean) => void;
}

export const AudioIcon: FunctionComponent<AudioIconProps> = ({
  audio,
  onChange,
}) => {
  const label = audio ? "audio on" : "muted";
  const icon = audio ? "🔊" : "🔇";
  return (
    <EmptyButton onClick={() => onChange(!audio)}>
      <Text variant="body">
        <span role="img" aria-label={label}>
          {icon}
        </span>
      </Text>
    </EmptyButton>
  );
};

const EmptyButton = styled.button`
  position: fixed;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
`;
