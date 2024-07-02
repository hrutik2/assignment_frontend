import React from 'react';
import Select from 'react-select';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)`
  border-radius: 10px;
  border: 1px solid black;
  color:black
`;


const Filter = ({ setFilter }) => {
  const handleChange = (selectedOption) => {
    setFilter(selectedOption.value);
  };

  return (
    <div style={{margin:"10px"}}>
      <Stack spacing={1} direction="row">
      
      <StyledButton variant="outlined" size="small">All</StyledButton>
      <StyledButton variant="outlined" size="small">XHR/Fetch</StyledButton>
      <StyledButton variant="outlined" size="small">JS</StyledButton>
      <StyledButton variant="outlined" size="small">CSS</StyledButton>
    </Stack>
      
    </div>
  );
};

export default Filter;
