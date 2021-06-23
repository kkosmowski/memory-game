import { ReactElement } from 'react';
import { Card } from '../Card/Card';
import styled from 'styled-components';
import { GameSettings } from '../../interfaces/game-settings.interface';

interface Props {
  settings: GameSettings;
}

interface WrapperProps {
  rows: number;
  cols: number;
}

export function Board({ settings }: Props): ReactElement {
  const _cards: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.slice(0, settings.cardsCount).split(''); // @todo: these should be doubled
  const cards: ReactElement[] = _cards.map((char: string) => <Card value={ char } />);
  return (
    <Wrapper rows={ settings.rows } cols={ settings.cols }>{ cards }</Wrapper>
  );
}

const Wrapper = styled.div<WrapperProps>`
  display: inline-grid;
  ${ p => `grid-template: repeat(${ p.rows }, 1fr) / repeat(${ p.cols }, 1fr);` }
  grid-gap: 16px;
`;