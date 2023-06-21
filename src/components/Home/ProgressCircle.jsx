
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import './loader.css';

const ProgressCircle = () => {

  return (
    <div className="loader">
 
      <Box sx={{ display: 'flex', color: '' }}>
      <CircularProgress />
    </Box>
   
    </div >
  );
};

export default ProgressCircle;
