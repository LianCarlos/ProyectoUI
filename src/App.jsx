import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import Sidebar from './components/Sidebar';
import SummaryCard from './components/SummaryCard';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import ExpenseChart from './components/ExpenseChart';

function App() {
  const [view, setView] = useState('dashboard');
  const [totals, setTotals] = useState({ balance: 0, income: 0, expense: 0 });

  const calculateTotals = async () => {
    try {
      const response = await fetch('http://localhost:5000/transactions');
      const data = await response.json();
      
      let inc = 0;
      let exp = 0;
      
      data.forEach(t => {
        if (t.type === 'Income') inc += Number(t.amount);
        if (t.type === 'Expense') exp += Number(t.amount);
      });

      setTotals({
        income: inc,
        expense: exp,
        balance: inc - exp
      });
    } catch (error) {
      console.error("Error cargando totales:", error);
    }
  };

  useEffect(() => {
    calculateTotals();
    const interval = setInterval(calculateTotals, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ display: 'flex', bgcolor: '#0f172a', minHeight: '100vh', color: '#f8fafc' }}>
      <Sidebar setView={setView} />
      
      <Box sx={{ flexGrow: 1, p: 4 }}>
        {view === 'dashboard' ? (
          <>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: '#ffffff' }}>
              Dashboard Financiero
            </Typography>

            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} md={4}>
                <SummaryCard title="Balance Total" amount={totals.balance.toLocaleString()} color="#4318ff" />
              </Grid>
              <Grid item xs={12} md={4}>
                <SummaryCard title="Ingresos" amount={totals.income.toLocaleString()} color="#05cd99" />
              </Grid>
              <Grid item xs={12} md={4}>
                <SummaryCard title="Gastos" amount={totals.expense.toLocaleString()} color="#ee5d50" />
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={12} md={7}>
                <TransactionForm />
              </Grid>
              <Grid item xs={12} md={5}>
                <ExpenseChart />
              </Grid>
            </Grid>
          </>
        ) : (
          <>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: '#ffffff' }}>
              Historial de Transacciones
            </Typography>
            <TransactionList />
          </>
        )}
      </Box>
    </Box>
  );
}

export default App;