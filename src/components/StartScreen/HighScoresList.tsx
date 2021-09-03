import { List, ListItem } from '@material-ui/core';
import { HighScoresListVariant } from '../../enums/high-scores-list-variant.enum';
import { ReactElement, useEffect, useState } from 'react';
import { HighScores } from '../../interfaces/high-scores.interfaces';
import { BoardSize } from '../../enums/board-size.enum';
import { NUMBER_OF_SCORES } from '../../consts/high-scores.consts';
import styled from 'styled-components';

interface Props {
  highScores: HighScores | null;
  variant: HighScoresListVariant;
  boardSize: BoardSize;
}

export function HighScoresList({ highScores, variant, boardSize }: Props) {
  const [currentHighScores, setCurrentHighScores] = useState<ReactElement[]>([]);
  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    const firstWord: string = variant === HighScoresListVariant.Last ? 'Last' : 'Top';
    setTitle(`${ firstWord } ${ NUMBER_OF_SCORES } scores`);
  }, [variant]);

  useEffect(() => {
    if (highScores && boardSize) {
      getSpecificHighScores(boardSize);
    }
  }, [boardSize, highScores]);

  const getSpecificHighScores = (boardSize: BoardSize): void => {
    let highScoresList: ReactElement[] = [];
    if (highScores![boardSize] && highScores![boardSize] && highScores![boardSize][variant]) {
      highScoresList = highScores![boardSize][variant].map((value, index) => (
        <ListItem key={ index }>{ index + 1 }. { value }s</ListItem>
      ));
    }
    setCurrentHighScores(highScoresList);
  };

  return (
    <HigScoresListComponent>
      <HighScoresListTitle>{ title }</HighScoresListTitle>
      { currentHighScores.length
        ? <List>{ currentHighScores }</List>
        : <NoScores>No scores for this board size yet.</NoScores>
      }
    </HigScoresListComponent>
  );
}

const HigScoresListComponent = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  ul > li:first-child {
    padding-top: 0;
  }
`;

const HighScoresListTitle = styled.h2`
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 8px;
`;

const NoScores = styled.p`
  text-align: center;
  opacity: 0.5;
`;