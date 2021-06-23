import Button from '@material-ui/core/Button';
import { ReactElement } from 'react';
import styled from 'styled-components';

interface Props {
  onStart: () => void;
}

export function StartScreen({ onStart }: Props): ReactElement {
  const instructions = `Hello!\nTo start the game, press the button below.\nGood luck!`;
  return (
    <>
      <InstructionsText>{ instructions }</InstructionsText>
      <Button onClick={ onStart } variant="contained" color="primary">Begin</Button>
    </>
  );
}

const InstructionsText = styled.p`
  white-space: pre;
`;