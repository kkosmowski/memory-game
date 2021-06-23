import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { ChangeEvent, ReactElement } from 'react';

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
    <FormControl variant="outlined">
      <InputLabel id={ labelId } htmlFor={ selectId }>{ label }</InputLabel>
      <Select
        value={ value }
        onChange={ onChange }
        id={ selectId}
        aria-labelledby={ labelId }
        label={ label }
      >
        { items }
      </Select>
    </FormControl>
  );
}