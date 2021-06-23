import { ReactElement } from 'react';
import { Board } from '../Board/Board';
import { Timer } from '../Timer/Timer';
import styled from 'styled-components';
import { Result } from '../Result/Result';
import { GameSettings } from '../../interfaces/game-settings.interface';

interface Props {
  settings: GameSettings;
}

export function Memory({ settings }: Props): ReactElement {
  return (
    <MemoryWrapper>
      <TopRow>
        <Result
          total={ settings.cardsCount / 2 }
        />
        <Timer />
      </TopRow>

      <Board settings={ settings } />
    </MemoryWrapper>
  );
}

const MemoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 448px; //@todo change to "columns * cardWidth + (columns - 1) * gapWidth"
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 32px;
`;