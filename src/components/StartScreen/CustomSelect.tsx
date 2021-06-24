import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { ChangeEvent, ReactElement } from 'react';
import styled from 'styled-components';

interface Props<T> {
  options: T[];
  value: T;
  onChange: (e: ChangeEvent<{ value: unknown }>) => void;
  label: string;
}

export function CustomSelect<T extends string>({ options, value, onChange, label }: Props<T>) {
  const items: ReactElement[] = options.map((opt: T) => (
    <MenuItem value={ opt } key={ opt }>{ opt }</MenuItem>
  ));
  const selectId = label.toLowerCase() + '-select';
  const labelId = selectId + '-label';

  return (
    <StyledFormControl variant="outlined">
      <InputLabel id={ labelId } htmlFor={ selectId }>{ label }</InputLabel>
      <Select
        value={ value }
        onChange={ onChange }
        id={ selectId }
        aria-labelledby={ labelId }
        label={ label }
      >
        { items }
      </Select>
    </StyledFormControl>
  );
}

const StyledFormControl = styled(FormControl)`
  && {
    min-width: 120px;
  }
`;