import { ReactElement, useEffect, useState } from 'react';
import { Card as MaterialCard } from '@material-ui/core';
import styled from 'styled-components';

interface Props {
  active: boolean;
  completed: boolean;
  flipped: boolean;
  id: number;
  onFlip: (id: number) => void;
  value: string;
  valueVisible: boolean;
}

export function Card({ active, completed, flipped, id, onFlip, value, valueVisible }: Props): ReactElement {
  const [className, setClassName] = useState<string>('');

  useEffect(() => {
    setClassName(completed ? '--completed' : flipped ? '--flipped' : '');
  }, [flipped]);

  const onClick = (): void => {
    onFlip(id);
  };

  return (
    <MemoryCardWrapper onClick={ onClick } className={ className } active={ active }>
      <MemoryCardReverse />
      <MemoryCardObverse>{ valueVisible || completed ? value : '' }</MemoryCardObverse>
    </MemoryCardWrapper>
  );
}

const MemoryCardWrapper = styled.div<{ active: boolean }>`
  ${ p => p.active ? '' : 'pointer-events: none;' }
  width: 100px;
  height: 100px;
  position: relative;
  transition: transform 1s;
  will-change: transform;
  transform-style: preserve-3d;
  cursor: pointer;

  && > * {
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
  width: 100px;
  height: 100px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 48px;
  font-family: 'Shippori Mincho', 'Times New Roman', serif;
`;

const MemoryCardObverse = styled(MemoryCardReverse)`
  transform: rotateY(180deg);
`;