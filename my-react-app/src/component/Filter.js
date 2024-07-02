import React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)`
  border-radius: 10px;
  border: 1px solid black;
  color:black
`

const Filter = ({ setFilter }) => {
  const handleFilterClick = (filterValue) => {
    setFilter(filterValue);
  };

  return (
    <div style={{ margin: "10px" }}>
      <Stack spacing={1} direction="row">
        <StyledButton variant="outlined" size="small" onClick={() => handleFilterClick('All')}>All</StyledButton>
        <StyledButton variant="outlined" size="small" onClick={()  => handleFilterClick('XHR/Fetch')}>XHR/Fetch</StyledButton>
        <StyledButton variant="outlined" size="small" onClick={() => handleFilterClick('JS')}>JS</StyledButton>
        <StyledButton variant="outlined" size="small" onClick={() => handleFilterClick('CSS')}>CSS</StyledButton>
      </Stack>
    </div>
  );
};

export default Filter;

