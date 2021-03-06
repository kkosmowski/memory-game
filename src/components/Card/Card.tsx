import { ReactElement, useEffect, useState } from 'react';
import { Card as MaterialCard } from '@material-ui/core';
import styled from 'styled-components';
import { media } from '../../consts/media-query.consts';

interface Props {
  active: boolean;
  completed: boolean;
  flipped: boolean;
  id: number;
  onFlip: (id: number) => void;
  value: string;
  visible: boolean;
}

export function Card({ active, completed, flipped, id, onFlip, value, visible }: Props): ReactElement {
  const [showValue, setShowValue] = useState<boolean>(false);
  const [className, setClassName] = useState<string>('');

  useEffect(() => {
    setShowValue(completed || flipped || visible);
  }, [completed, flipped, visible]);

  useEffect(() => {
    setClassName(completed ? '--completed' : flipped ? '--flipped' : '');
  }, [flipped]);

  const onClick = (): void => {
    onFlip(id);
  };

  return (
    <MemoryCardWrapper onClick={ onClick } className={ className } active={ active }>
      <MemoryCardReverse />
      <MemoryCardObverse>{ showValue ? value : '' }</MemoryCardObverse>
    </MemoryCardWrapper>
  );
}

const MemoryCardWrapper = styled.div<{ active: boolean }>`
  ${ p => p.active ? '' : 'pointer-events: none;' }
  width: 100%;
  height: 100%;
  max-width: 100px;
  max-height: 100px;
  position: relative;
  transition: transform 1s;
  will-change: transform;
  transform-style: preserve-3d;
  cursor: pointer;

  && > * {
    width: 100%;
    height: 100%;
    transition: opacity 0.5s 0.75s;
    will-change: opacity;
  }

  &.--flipped {
    transform: rotateY(180deg);
  }

  &.--completed {
    pointer-events: none;
    transform: rotateY(180deg);

    > * {
      opacity: 0;
    }
  }
`;

const MemoryCardReverse = styled(MaterialCard)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Shippori Mincho', 'Times New Roman', serif;
  font-size: 28px;

  @media ${ media.tablet.l } {
    font-size: 48px;
  }
  @media ${ media.desktop.m } {
    font-size: 56px;
  }
`;

const MemoryCardObverse = styled(MemoryCardReverse)`
  transform: rotateY(180deg);
`;