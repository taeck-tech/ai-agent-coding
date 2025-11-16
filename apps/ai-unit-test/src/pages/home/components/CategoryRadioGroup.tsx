import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  FormControl,
} from '@mui/material';
import React from 'react';

import { ALL_CATEGORY_ID } from '@/constants';
import useCategories from '@/pages/home/hooks/useCategories';

type Category = {
  id: number | string;
  name: string;
};

type CategoryRadioGroupProps = {
  categoryId: number | string;
  onChangeCategory: React.ChangeEventHandler<HTMLInputElement>;
};

const CategoryRadioGroup: React.FC<CategoryRadioGroupProps> = ({
  categoryId,
  onChangeCategory,
}) => {
  const { data } = useCategories() as { data?: Category[] };

  return (
    <FormControl>
      <FormLabel>카테고리</FormLabel>
      <RadioGroup
        row
        name="category"
        onChange={onChangeCategory}
        value={categoryId}
      >
        <FormControlLabel
          value={ALL_CATEGORY_ID}
          control={<Radio />}
          id="All"
          label="All"
        />
        {data?.map(({ id, name }) => {
          return (
            <FormControlLabel
              key={id}
              value={id}
              id={String(id)}
              control={<Radio />}
              label={name}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};

export default CategoryRadioGroup;


