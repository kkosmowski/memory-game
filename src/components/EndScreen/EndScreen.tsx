import { ReactElement } from 'react';
import { Button } from '@material-ui/core';
import styled from 'styled-components';
import { EndData } from '../../interfaces/end-data.interface';
import { ScoreUtil } from '../../utils/score.util';
import { Difficulty } from '../../enums/difficulty.enum';

interface Props {
  data: EndData;
  onRestart: () => void;
}

export function EndScreen({ data, onRestart }: Props): ReactElement {
  const resultText: ReactElement = (
    <ResultText
      win={ true }
      difficultyReached={ ScoreUtil.getReachedDifficultyForTime(data.elapsed, data.boardSize) }
    >{ data.elapsed }s</ResultText>
  );
  const difficultyText = <strong>{ data.difficulty }</strong>;
  const maxTimeText = <ResultText win={ false }>{ data.elapsed }s</ResultText>;
  const winMessage = <>It took you { resultText } to finish the { difficultyText } game.</>;
  const lossMessage = <>You didn't manage to finish the game in { maxTimeText }.</>;
  return (
    <>
      <EndTextContainer>
        <ResultHeader win={ data.won }>{ data.won ? 'You\'ve won!' : 'You\'ve lost :(' }</ResultHeader>
        { data.won ? null : <p>Your score: { data!.points.score }/{ data!.points.total }</p> }
        <p>{ data.won ? winMessage : lossMessage }</p>

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

const ResultHeader = styled.h1<{ win: boolean }>`
  ${ p => `color: var(--${ p.win ? 'win' : 'loss' }-color);` }
  margin-bottom: 0;
`;
const ResultText = styled.strong<{ win: boolean, difficultyReached?: Difficulty | null }>`
  ${ p => p.win && p.difficultyReached ? ScoreUtil.getScoreStyles(p.difficultyReached) : '' }
`;
