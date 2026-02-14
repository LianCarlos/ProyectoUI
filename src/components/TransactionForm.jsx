import React, { useState } from 'react';
import { Box, TextField, Button, Paper, Typography, Stack } from '@mui/material';

const TransactionForm = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleSave = async (tipo) => {
    if (!description || !amount) return alert('Por favor, rellena los campos');

    const newTransaction = {
      description,
      amount: parseFloat(amount),
      type: tipo, // 'Income' o 'Expense'
      category: tipo === 'Income' ? 'Depósito' : 'Gasto',
      date: new Date().toLocaleString()
    };

    await fetch('http://localhost:5000/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTransaction)
    });

    setDescription('');
    setAmount('');
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 4, bgcolor: '#1e293b', color: 'white', boxShadow: '0 10px 25px rgba(0,0,0,0.3)' }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Nueva Operación</Typography>
      <Stack spacing={2}>
        <TextField 
          label="Descripción" 
          fullWidth value={description} 
          onChange={(e) => setDescription(e.target.value)}
          variant="filled" sx={{ bgcolor: '#334155', borderRadius: 1 }}
          InputLabelProps={{ style: { color: '#cbd5e1' } }}
          inputProps={{ style: { color: 'white' } }}
        />
        <TextField 
          label="Monto $" type="number"
          fullWidth value={amount} 
          onChange={(e) => setAmount(e.target.value)}
          variant="filled" sx={{ bgcolor: '#334155', borderRadius: 1 }}
          InputLabelProps={{ style: { color: '#cbd5e1' } }}
          inputProps={{ style: { color: 'white' } }}
        />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            fullWidth variant="contained" 
            onClick={() => handleSave('Income')}
            sx={{ bgcolor: '#10b981', '&:hover': { bgcolor: '#059669' }, height: 55, fontWeight: 'bold' }}
          >
            + AGREGAR INGRESO
          </Button>
          <Button 
            fullWidth variant="contained" 
            onClick={() => handleSave('Expense')}
            sx={{ bgcolor: '#ef4444', '&:hover': { bgcolor: '#dc2626' }, height: 55, fontWeight: 'bold' }}
          >
            - REGISTRAR GASTO
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
};

export default TransactionForm;