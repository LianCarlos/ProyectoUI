import React, { useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import Sidebar from './components/Sidebar';
import SummaryCard from './components/SummaryCard';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import ExpenseChart from './components/ExpenseChart';

function App() {
  // Este estado controla qué "página" vemos
  const [view, setView] = useState('dashboard');

  return (
    <Box sx={{ display: 'flex', bgcolor: '#f4f7fe', minHeight: '100vh' }}>
      {/* Le pasamos la función para cambiar de vista al Sidebar */}
      <Sidebar setView={setView} />
      
      <Box sx={{ flexGrow: 1, p: 4 }}>
        {view === 'dashboard' ? (
          <>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: '#1b2559' }}>
              Dashboard Financiero
            </Typography>

            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} md={4}><SummaryCard title="Balance" amount="3,800" color="#4318ff" /></Grid>
              <Grid item xs={12} md={4}><SummaryCard title="Ingresos" amount="5,200" color="#05cd99" /></Grid>
              <Grid item xs={12} md={4}><SummaryCard title="Gastos" amount="1,400" color="#ee5d50" /></Grid>
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
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: '#1b2559' }}>
              Todas las Transacciones
            </Typography>
            <TransactionList />
          </>
        )}
      </Box>
    </Box>
  );
}

export default App;