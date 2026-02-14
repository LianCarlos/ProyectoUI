import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Paper, Typography, Box } from '@mui/material';

// Colores modernos para el jefe
const COLORS = ['#4318ff', '#6ad2ff', '#05cd99', '#ffb547', '#ee5d50'];

const ExpenseChart = () => {
  const [data, setData] = useState([]);

  const processData = (transactions) => {
    // Agrupamos los montos por categoría
    const totals = transactions.reduce((acc, curr) => {
      const cat = curr.category || 'Otros';
      acc[cat] = (acc[cat] || 0) + Number(curr.amount);
      return acc;
    }, {});

    // Lo convertimos al formato que necesita la gráfica
    return Object.keys(totals).map(key => ({
      name: key,
      value: totals[key]
    }));
  };

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/transactions');
      const transactions = await response.json();
      setData(processData(transactions));
    } catch (error) {
      console.error("Error en la gráfica:", error);
    }
  };

  useEffect(() => {
    fetchData();
    // Se actualiza cada 2 segundos para que parezca magia
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Paper sx={{ p: 3, borderRadius: 4, height: 400, boxShadow: '0px 4px 20px rgba(0,0,0,0.05)' }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#2b3674' }}>
        Distribución de Gastos
      </Typography>
      <Box sx={{ width: '100%', height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36}/>
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default ExpenseChart;