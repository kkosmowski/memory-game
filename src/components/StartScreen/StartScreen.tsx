import Button from '@material-ui/core/Button';
import { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import { GameSettings } from '../../interfaces/game-settings.interface';
import { CustomSelect } from './CustomSelect';
import { Difficulty } from '../../enums/difficulty.enum';
import { BoardSize } from '../../enums/board-size.enum';
import { getBoardSizeFromGameSettings } from '../../utils/get-board-size-from-game-settings.util';
import { getGameTime } from '../../utils/get-game-time.util';
import { getPairsCount } from '../../utils/get-pairs-count.util';
import { StorageUtil } from '../../utils/storage.util';
import { STORAGE_SETTINGS_KEY } from '../../consts/storage.consts';

interface Props {
  onStart: () => void;
  onSettingsChange: (s: GameSettings) => void;
  gameSettings: GameSettings;
}

export function StartScreen({ onStart, onSettingsChange, gameSettings }: Props): ReactElement {
  const [settings, setSettings] = useState<GameSettings>(gameSettings);
  const [selectedSize, setSelectedSize] = useState<BoardSize>(getBoardSizeFromGameSettings(gameSettings));
  const instructions = `Hello!\nTo start the game, press the button below.\nGood luck!`;
  const difficulties = Object.values(Difficulty);
  const sizes = Object.values(BoardSize);

  useEffect(() => {
    setSettings(gameSettings);
    setSelectedSize(getBoardSizeFromGameSettings(gameSettings));
  }, [gameSettings]);

  const onSizeChange = (event: ChangeEvent<{ value: unknown }>) => {
    const size = event.target.value as BoardSize;
    setSelectedSize(size);
    const [rows, _, cols] = size.split('');
    const newSettings: GameSettings = {
      ...settings,
      pairsCount: getPairsCount({ rows: +rows, cols: +cols }),
      rows: +rows,
      cols: +cols,
    };
    onSettingsChange(newSettings);
  };

  const onDifficultyChange = (event: ChangeEvent<{ value: unknown }>) => {
    const newDifficulty = event.target.value as Difficulty;
    const newSettings: GameSettings = {
      ...settings,
      difficulty: newDifficulty
    };
    onSettingsChange({
      ...newSettings,
      gameTime: getGameTime(newSettings)
    });
  };

  const onSettingsSave = (): void => {
    StorageUtil.set(STORAGE_SETTINGS_KEY, settings);
  };

  return (
    <Wrapper>
      <InstructionsText>{ instructions }</InstructionsText>

      <Controls>
        <CustomSelect
          onChange={ onSizeChange }
          options={ sizes }
          value={ selectedSize }
          label="Size"
        />

        <CustomSelect
          onChange={ onDifficultyChange }
          options={ difficulties }
          value={ settings.difficulty }
          label="Difficulty"
        />
      </Controls>

      <Button onClick={ onStart } variant="contained" color="primary">Begin</Button>
      <Button onClick={ onSettingsSave } variant="contained">Save settings</Button>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 360px;
  padding: 0 16px;
  margin-bottom: -8px;

  > .MuiButton-root {
    margin-bottom: 8px;
  }
`;

const InstructionsText = styled.p`
  white-space: pre;
`;

const Controls = styled.section`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 24px 0 16px;
`;