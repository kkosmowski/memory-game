import { ReactElement, useEffect, useState } from 'react';
import { Board } from '../Board/Board';
import { Timer } from '../Timer/Timer';
import styled from 'styled-components';
import { Result } from '../Result/Result';
import { GameSettings } from '../../interfaces/game-settings.interface';
import { Difficulty } from '../../enums/difficulty.enum';

interface Props {
  settings: GameSettings;
  onFinish: () => void;
  onTimerEnd: () => void;
}

export function Memory({ settings, onFinish, onTimerEnd }: Props): ReactElement {
  const [score, setScore] = useState<number>(0);
  const timerVisible = settings.difficulty !== Difficulty.Relaxing;

  useEffect(() => {
    if (score === settings.pairsCount) {
      onFinish();
    }
  }, [score]);

  const onMatch = (): void => {
    setScore(score + 1);
  };

  const timerEnded = (): void => {
    onTimerEnd();
  };

  return (
    <MemoryWrapper>
      <TopRow>
        <Result
          score={ score }
          total={ settings.pairsCount }
        />
        { timerVisible ? <Timer onTimerEnd={ timerEnded } initialTime={ settings.gameTime } /> : '' }
      </TopRow>

      <Board settings={ settings } onMatch={ onMatch } />
    </MemoryWrapper>
  );
}

const MemoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 448px; //@todo change to "columns * cardWidth + (columns - 1) * gapWidth"
  margin-bottom: var(--margin);
`;