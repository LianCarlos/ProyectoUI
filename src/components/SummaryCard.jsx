import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

const SummaryCard = ({ title, amount, color }) => {
  return (
    <Paper sx={{ p: 3, borderRadius: 4, bgcolor: '#1e293b', color: 'white', borderLeft: `6px solid ${color}` }}>
      <Typography variant="body2" sx={{ color: '#94a3b8', fontWeight: 'bold' }}>{title}</Typography>
      <Box sx={{ display: 'flex', alignItems: 'baseline', mt: 1 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>${amount}</Typography>
      </Box>
    </Paper>
  );
};

export default SummaryCard;