import { MouseEventHandler, ReactElement, useEffect, useState } from 'react';
import { Card as MaterialCard } from '@material-ui/core';
import styled from 'styled-components';

interface Props {
  value: string;
  id: number;
  onFlip: (id: number) => void;
  flipped: boolean;
  completed: boolean;
}

export function Card({ value, id, flipped, completed, onFlip }: Props): ReactElement {
  const [className, setClassName] = useState<string>('');

  useEffect(() => {
    setClassName(completed ? '--completed' : flipped ? '--flipped' : '');
  }, [flipped]);

  const onClick = (): void => {
    onFlip(id);
  };

  return (
    <MemoryCardWrapper onClick={ onClick } className={ className }>
      <MemoryCardReverse />
      <MemoryCardObverse>{ value }</MemoryCardObverse>
    </MemoryCardWrapper>
  );
}

const MemoryCardWrapper = styled.div`
  width: 100px;
  height: 100px;
  position: relative;
  transition: transform 1s;
  will-change: transform;
  transform-style: preserve-3d;

  &.--flipped {
    transform: rotateY(180deg);
  }

  &.--completed {
    pointer-events: none;
    transform: rotateY(180deg);

    > * {
      opacity: 0.4;
    }
  }
`;

const MemoryCardReverse = styled(MaterialCard)`
  width: 100px;
  height: 100px;
  position: absolute;
  //backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 48px;
  font-family: 'Shippori Mincho', 'Times New Roman', serif;
`;

const MemoryCardObverse = styled(MemoryCardReverse)`
  transform: rotateY(180deg);
`;