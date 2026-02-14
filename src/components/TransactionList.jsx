import React, { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Chip, Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);

  // 1. Función para traer los datos
  const fetchTransactions = async () => {
    try {
      const response = await fetch('http://localhost:5000/transactions');
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error("Error cargando datos:", error);
    }
  };

  // 2. FUNCIÓN PARA BORRAR
  const deleteTransaction = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta transacción?")) {
      try {
        await fetch(`http://localhost:5000/transactions/${id}`, {
          method: 'DELETE',
        });
        // Refrescamos la lista inmediatamente después de borrar
        fetchTransactions();
      } catch (error) {
        console.error("Error al borrar:", error);
      }
    }
  };

  useEffect(() => {
    fetchTransactions();
    const interval = setInterval(fetchTransactions, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <TableContainer component={Paper} sx={{ mt: 4, borderRadius: 4, boxShadow: '0px 4px 20px rgba(0,0,0,0.05)' }}>
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2b3674' }}>
          Historial de Movimientos
        </Typography>
        <Chip label={`${transactions.length} registros`} color="primary" variant="outlined" size="small" />
      </Box>
      
      <Table>
        <TableHead sx={{ bgcolor: '#f8f9fa' }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Descripción</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Categoría</TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bold' }}>Monto</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} align="center" sx={{ py: 3, color: 'gray' }}>
                No hay transacciones aún.
              </TableCell>
            </TableRow>
          ) : (
            transactions.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell>{row.description}</TableCell>
                <TableCell>
                  <Chip label={row.category || 'General'} size="small" />
                </TableCell>
                <TableCell 
                  align="right" 
                  sx={{ color: row.type === 'Income' ? '#05cd99' : '#ee5d50', fontWeight: 'bold' }}
                >
                  {row.type === 'Income' ? '+' : '-'} ${row.amount}
                </TableCell>
                <TableCell align="center">
                  <IconButton 
                    onClick={() => deleteTransaction(row.id)} 
                    color="error" 
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionList;