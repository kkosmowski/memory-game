import Button from '@material-ui/core/Button';
import { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import { GameSettings } from '../../interfaces/game-settings.interface';
import { CustomSelect } from './CustomSelect';
import { Difficulty } from '../../enums/difficulty.enum';
import { BoardSize } from '../../enums/board-size.enum';
import { getBoardSizeFromGameSettings } from '../../utils/get-board-size-from-game-settings.util';
import { getPairsCount } from '../../utils/get-pairs-count.util';
import { StorageUtil } from '../../utils/storage.util';
import { STORAGE_SETTINGS_KEY } from '../../consts/storage.consts';
import { boardSizeChar } from '../../consts/board-size.consts';
import { Controls, HighScoresWrapper, InstructionsText, Wrapper } from './StartScreen.styles';
import { HighScoresList } from './HighScoresList';
import { HighScoresListVariant } from '../../enums/high-scores-list-variant.enum';
import { HighScores } from '../../interfaces/high-scores.interfaces';

interface Props {
  onStart: () => void;
  onSettingsChange: (s: GameSettings) => void;
  gameSettings: GameSettings;
  highScores: HighScores | null;
}

export function StartScreen({ onStart, onSettingsChange, gameSettings, highScores }: Props): ReactElement {
  const [settings, setSettings] = useState<GameSettings>(gameSettings);
  const [selectedSize, setSelectedSize] = useState<BoardSize>(getBoardSizeFromGameSettings(gameSettings));
  const instructions = `Hello!\nTo start the game, press the "BEGIN" button below.\nGood luck!`;
  const difficulties = Object.values(Difficulty);
  const sizes = Object.values(BoardSize);

  useEffect(() => {
    setSettings(gameSettings);
    setSelectedSize(getBoardSizeFromGameSettings(gameSettings));
  }, [gameSettings]);

  const onSizeChange = (event: ChangeEvent<{ value: unknown }>) => {
    const size = event.target.value as BoardSize;
    setSelectedSize(size);
    const [rows, cols] = size.split(boardSizeChar);
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
    onSettingsChange(newSettings);
  };

  const onSettingsSave = (): void => {
    StorageUtil.set(STORAGE_SETTINGS_KEY, settings);
  };

  return (
    <Wrapper>
      <InstructionsText>{ instructions }</InstructionsText>

      <Controls>
        <CustomSelect<string>
          onChange={ onSizeChange }
          options={ sizes }
          value={ selectedSize }
          label="Size"
        />

        <CustomSelect<string>
          onChange={ onDifficultyChange }
          options={ difficulties }
          value={ settings.difficulty }
          label="Difficulty"
        />
      </Controls>

      <Button onClick={ onStart } variant="contained" color="primary">Begin</Button>
      <Button onClick={ onSettingsSave } variant="contained">Save settings</Button>

      <HighScoresWrapper>
        <HighScoresList
          highScores={ highScores }
          variant={ HighScoresListVariant.Last }
          boardSize={ selectedSize }
          withColors={ false }
        />
        <HighScoresList
          highScores={ highScores }
          variant={ HighScoresListVariant.Top }
          boardSize={ selectedSize }
          withColors={ true }
        />
      </HighScoresWrapper>
    </Wrapper>
  );
}