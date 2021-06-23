import { Memory } from './components/Memory/Memory';
import { useState } from 'react';
import { StartScreen } from './components/StartScreen/StartScreen';
import { GameSettings } from './interfaces/game-settings.interface';
import { Difficulty } from './enums/difficulty.enum';

const cols = 4;
const rows = 3;

const defaultGameSettings: GameSettings = {
  cardsCount: cols * rows,
  rows,
  cols,
  difficulty: Difficulty.Relaxing,
};

function App() {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [settings, setSettings] = useState<GameSettings>(defaultGameSettings);

  const onStart = (): void => {
    setInitialized(true);
  };

  return initialized
    ? <Memory settings={ settings } />
    : <StartScreen onStart={ onStart } />;
}

export default App;
