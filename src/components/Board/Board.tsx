import { ReactElement, useEffect, useMemo, useState } from 'react';
import { Card } from '../Card/Card';
import styled from 'styled-components';
import { GameSettings } from '../../interfaces/game-settings.interface';
import { CardInterface } from '../../interfaces/card.interface';
import { media } from '../../consts/media-query.consts';

interface Props {
  onMatch: () => void;
  settings: GameSettings;
}

interface WrapperProps {
  cols: number;
  rows: number;
}

export function Board({ onMatch, settings }: Props): ReactElement {
  const characters: string[] = useMemo((): string[] => {
    const characters: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789'.slice(0, settings.pairsCount).split('');
    return [...characters, ...characters].sort(() => 0.5 - Math.random());
  }, [settings.pairsCount]);
  const cards = setInitialCards();
  const [flippedCards, setFlippedCards] = useState<boolean[]>(cards.map(() => false));
  const [visibility, setVisibility] = useState<boolean[]>(cards.map(() => false));
  const [completedCards, setCompletedCards] = useState<boolean[]>(cards.map(() => false));
  const [cardsActive, setCardsActive] = useState<boolean>(true);

  const cardElements: ReactElement[] = characters.map((char: string, i: number) => (
    <Card
      active={ cardsActive }
      value={ char }
      visible={ visibility[i] }
      onFlip={ onCardFlip }
      flipped={ flippedCards[i] }
      completed={ completedCards[i] }
      id={ i }
      key={ i }
    />
  ));

  function setInitialCards(): CardInterface[] {
    return characters.map((char, i) => ({
      id: i,
      value: char,
    }));
  }

  const checkIfMatch = () => {
    const [i, j]: number[] = flippedCards
      .map((flipped, index) => ({ flipped, index }))
      .filter((card) => card.flipped)
      .map((card) => card.index);

    if (cards[i].value === cards[j].value) {
      setValueAtIndexes<boolean>(completedCards, setCompletedCards, true, [i, j]);
      onMatch();
    } else {
      setTimeout(() => {
        setValueAtIndexes<boolean>(visibility, setVisibility, false, [i, j]);
      }, 250);
    }
    setValueAtIndexes<boolean>(flippedCards, setFlippedCards, false, [i, j]);
    setCardsActive(true);
  };

  function onCardFlip(cardId: number) {
    if (!completedCards[cardId]) {
      setFlippedCards(flippedCards.map((flipped, index) => index === cardId ? true : flipped));
      setVisibility(visibility.map((visible, index) => index === cardId ? true : visible));
    }
  }

  // consider making this a util
  const setValueAtIndexes = <T, >(originalList: T[], listSetter: ((l: T[]) => void), value: T, indexes: number[]): void => {
    const list: T[] = [...originalList];
    for (let i of indexes) {
      list[i] = value;
    }
    listSetter(list);
  };

  useEffect(() => {
    if (flippedCards.filter((flipped) => flipped).length === 2) {
      setCardsActive(false);
      setTimeout(() => {
        checkIfMatch();
      }, 500);
    }
  }, [flippedCards]);

  return (
    <Wrapper rows={ settings.rows } cols={ settings.cols }>{ cardElements }</Wrapper>
  );
}

const Wrapper = styled.div<WrapperProps>`
  display: grid;
  grid-gap: var(--margin);
  padding: var(--margin);
  width: min(100%, calc(${ p => p.rows + ' * var(--regular-card-size) + ' + (p.rows + 1) + ' * var(--margin)' }));
  height: min(100%, calc(${ p => p.cols + ' * var(--regular-card-size) + ' + (p.cols + 1) + ' * var(--margin)' }));
  ${ p => `grid-template: repeat(${ p.cols }, 1fr) / repeat(${ p.rows }, 1fr);` } @media ${ media.tablet.m } {
    width: min(100%, calc(${ p => p.cols + ' * var(--regular-card-size) + ' + (p.cols + 1) + ' * var(--margin)' }));
    height: min(100%, calc(${ p => p.rows + ' * var(--regular-card-size) + ' + (p.rows + 1) + ' * var(--margin)' }));
    ${ p => `grid-template: repeat(${ p.rows }, 1fr) / repeat(${ p.cols }, 1fr);` }
  }
`;