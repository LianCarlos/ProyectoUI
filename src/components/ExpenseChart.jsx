import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Paper, Typography, Box } from '@mui/material';

// Datos de prueba: Esto es lo que luego vendrá de tu base de datos
const data = [
  { name: 'Comida', value: 400 },
  { name: 'Renta', value: 1200 },
  { name: 'Entretenimiento', value: 300 },
  { name: 'Servicios', value: 200 },
];

// Colores elegantes para las categorías
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const ExpenseChart = () => {
  return (
    <Paper sx={{ p: 3, borderRadius: 4, height: 400, boxShadow: '0px 4px 20px rgba(0,0,0,0.05)' }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#2b3674' }}>
        Distribución de Gastos
      </Typography>
      <Box sx={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60} // Esto la hace tipo "Dona" (más moderna)
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