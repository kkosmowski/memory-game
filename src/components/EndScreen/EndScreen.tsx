import { ReactElement } from 'react';
import { Difficulty } from '../../enums/difficulty.enum';
import { Button } from '@material-ui/core';
import styled from 'styled-components';

interface Props {
  difficulty: Difficulty;
  elapsed: string;
  onRestart: () => void;
}

export function EndScreen({ difficulty, elapsed, onRestart }: Props): ReactElement {
  return (
    <>
      <EndTextContainer>
        <p>You've won!</p>
        <p>It took you <strong>{ elapsed }</strong> to finish the game.</p>
      </EndTextContainer>

      <Button onClick={ onRestart } variant="contained" color="primary">Start again</Button>
    </>
  );
}

const EndTextContainer = styled.main`
  text-align: center;
  line-height: 2;
  margin-bottom: 32px;
`;