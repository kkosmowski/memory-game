import { ReactElement } from 'react';
import { Difficulty } from '../../enums/difficulty.enum';
import { Button } from '@material-ui/core';
import styled from 'styled-components';

interface Props {
  win: boolean;
  difficulty: Difficulty;
  elapsed: string;
  onRestart: () => void;
}

export function EndScreen({ win, difficulty, elapsed, onRestart }: Props): ReactElement {
  const title = win ? <>You've won!</> : <>You've lost :(</>;
  const winMessage = <>It took you <ElapsedTime win={ true }>{ elapsed }</ElapsedTime> to finish the game.</>;
  const lossMessage = <>You didn't manage to finish the game in <ElapsedTime
    win={ false }>{ elapsed }</ElapsedTime>.</>;
  return (
    <>
      <EndTextContainer>
        <p>{ title }</p>
        <p>{ win ? winMessage : lossMessage }</p>

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

const ElapsedTime = styled.strong<{ win: boolean }>`
  ${ p => `color: var(--${ p.win ? 'win' : 'loss' }-color);` }
`;
