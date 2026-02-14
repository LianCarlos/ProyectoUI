import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const SummaryCard = ({ title, amount, color }) => {
  return (
    <Card sx={{ minWidth: 200, flexGrow: 1, borderRadius: 3, boxShadow: 3 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: color }}>
          ${amount}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;