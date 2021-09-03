import styled from 'styled-components';

export const Wrapper = styled.main`
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

export const InstructionsText = styled.p`
  white-space: pre;
`;

export const Controls = styled.section`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 24px 0 16px;
`;

export const HighScoresWrapper = styled.aside`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: var(--margin);
`;