import { ReactElement } from 'react';
import { Button } from '@material-ui/core';
import styled from 'styled-components';
import { EndData } from '../../interfaces/end-data.interface';

interface Props {
  data: EndData;
  onRestart: () => void;
}

export function EndScreen({ data, onRestart }: Props): ReactElement {
  const title = <ResultHeader win={ data.won }>{ data.won ? 'You\'ve won!' : 'You\'ve lost :(' }</ResultHeader>;
  const score = data.won ? null : <p>Your score: { data!.points.score }/{ data!.points.total }</p>;
  const winMessage = <>It took you <ResultText win={ true }>{ data.elapsed }</ResultText> to finish
    the <strong>{ data.difficulty }</strong> game.</>;
  const lossMessage = <>You didn't manage to finish the game in <ResultText
    win={ false }>{ data.elapsed }</ResultText>.</>;
  return (
    <>
      <EndTextContainer>
        { title }
        { score }
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
const ResultText = styled.strong<{ win: boolean }>`
  ${ p => `color: var(--${ p.win ? 'win' : 'loss' }-color);` }
`;
