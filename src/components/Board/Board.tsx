import { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import { Card } from '../Card/Card';
import styled from 'styled-components';
import { GameSettings } from '../../interfaces/game-settings.interface';
import { CardInterface } from '../../interfaces/card.interface';

interface Props {
  settings: GameSettings;
}

interface WrapperProps {
  rows: number;
  cols: number;
}

export function Board({ settings }: Props): ReactElement {
  const characters: string[] = useMemo((): string[] => {
    console.log('generateCharacters');
    const characters: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.slice(0, settings.cardsCount).split('');
    return [...characters, ...characters].sort(() => 0.5 - Math.random());
  }, [settings.cardsCount]);

  const [flippedCards, setFlippedCards] = useState<CardInterface[]>([]);
  const [cards, setCards] = useState<CardInterface[]>(setInitialCards());
  const cardElements: ReactElement[] = characters.map((char: string, i: number) => (
    <Card
      value={ char }
      onFlip={ onCardFlip }
      flipped={ cards[i].flipped }
      completed={ cards[i].completed }
      id={ i }
      key={ i }
    />
  ));

  function setInitialCards(): CardInterface[] {
    return characters.map((char, i) => ({
      id: i,
      value: char,
      flipped: false,
      completed: false,
    }));
  }

  const checkIfMatch = useCallback(() => {
    if (flippedCards[0].value === flippedCards[1].value) {
      setCards(cards.map((card) => ({
        ...card,
        completed: card.id === flippedCards[0].id || card.id === flippedCards[1].id,
        flipped: false
      })));
    } else {
      setCards(cards.map((card) => ({
        ...card,
        flipped: false
      })));
    }
    setFlippedCards([]);
  }, []);

  function onCardFlip(cardId: number) {
    if (!cards[cardId].completed) {
      setCards(cards.map((card) => card.id === cardId
        ? { ...card, flipped: !card.flipped }
        : card
      ));
      setFlippedCards([...flippedCards, cards[cardId]]);
    }
  }

  useEffect(() => {
    if (flippedCards.length === 2) {
      setTimeout(() => {
        checkIfMatch();
      }, 500);
    }
  }, [flippedCards, checkIfMatch]);

  return (
    <Wrapper rows={ settings.rows } cols={ settings.cols }>{ cardElements }</Wrapper>
  );
}

const Wrapper = styled.div<WrapperProps>`
  display: inline-grid;
  ${ p => `grid-template: repeat(${ p.rows }, 1fr) / repeat(${ p.cols }, 1fr);` }
  grid-gap: 16px;
  perspective: 600px;
`;