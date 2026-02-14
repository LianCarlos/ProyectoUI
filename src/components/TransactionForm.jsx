import React, { useState } from 'react';
import { Box, TextField, MenuItem, Button, Paper, Typography, Stack } from '@mui/material';

const TransactionForm = ({ onTransactionAdded }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Other');
  const [type, setType] = useState('Expense');

  const handleSubmit = async () => {
    if (!description || !amount) return alert('Por favor llena los campos');

    const newTransaction = {
      description,
      amount: parseFloat(amount),
      category,
      type
    };

    // GUARDAR EN TU BACKEND LOCAL
    try {
      await fetch('http://localhost:5000/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTransaction)
      });
      
      alert('¡Guardado localmente!');
      setDescription('');
      setAmount('');
      if (onTransactionAdded) onTransactionAdded();
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 4, mt: 4 }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', color: '#2b3674' }}>
        Nueva Transacción (Local)
      </Typography>
      <Stack direction="row" spacing={2}>
        <TextField label="Descripción" value={description} onChange={(e) => setDescription(e.target.value)} fullWidth />
        <TextField label="Monto" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} fullWidth />
        <Button variant="contained" onClick={handleSubmit} sx={{ bgcolor: '#05cd99' }}>Agregar</Button>
      </Stack>
    </Paper>
  );
};

export default TransactionForm;