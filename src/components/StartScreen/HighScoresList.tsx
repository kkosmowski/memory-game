import { Tooltip } from '@material-ui/core';
import { HighScoresListVariant } from '../../enums/high-scores-list-variant.enum';
import { ReactElement, useEffect, useState } from 'react';
import { HighScores } from '../../interfaces/high-scores.interfaces';
import { BoardSize } from '../../enums/board-size.enum';
import { NUMBER_OF_SCORES } from '../../consts/high-scores.consts';
import styled from 'styled-components';
import { Difficulty } from '../../enums/difficulty.enum';
import { ScoreUtil } from '../../utils/score.util';

interface Props {
  highScores: HighScores | null;
  variant: HighScoresListVariant;
  boardSize: BoardSize;
  withColors: boolean;
}

export function HighScoresList({ highScores, variant, boardSize, withColors }: Props) {
  const [currentHighScores, setCurrentHighScores] = useState<ReactElement[]>([]);
  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    const firstWord: string = variant === HighScoresListVariant.Last ? 'Last' : 'Top';
    setTitle(`${ firstWord } ${ NUMBER_OF_SCORES } scores`);
  }, [variant]);

  useEffect(() => {
    if (highScores && boardSize) {
      getSpecificHighScores();
    }
  }, [boardSize, highScores]);

  const getSpecificHighScores = (): void => {
    let highScoresList: ReactElement[] = [];
    if (highScores![boardSize] && highScores![boardSize] && highScores![boardSize][variant]) {
      highScoresList = highScores![boardSize][variant].map((value, i) => {
        if (withColors) {
          const difficultyReached: Difficulty | null = ScoreUtil.getReachedDifficultyForTime(value, boardSize);
          return (
            <Tooltip title={ difficultyReached || '' } placement="right">
              <Score difficultyReached={ difficultyReached } key={ i }>{ value }s</Score>
            </Tooltip>
          );
        }
        return (
          <Score key={ i }>{ value }s</Score>
        );
      });
    }
    setCurrentHighScores(highScoresList);
  };

  return (
    <HigScoresListComponent>
      <HighScoresListTitle>{ title }</HighScoresListTitle>
      { currentHighScores.length
        ? <ScoreList>{ currentHighScores }</ScoreList>
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

const ScoreList = styled.ol`
  margin: 0;
  padding: 8px 0;
`;

const Score = styled.li<{ difficultyReached?: Difficulty | null }>`
  ${ ({ difficultyReached }) => difficultyReached && ScoreUtil.getScoreStyles(difficultyReached) };
  padding: 4px 0;
`;