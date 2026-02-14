import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import SettingsIcon from '@mui/icons-material/Settings';

const Sidebar = ({ setView }) => {
  return (
    <Box sx={{ width: 240, height: '100vh', bgcolor: '#1a2035', color: 'white', p: 2 }}>
      <Typography variant="h6" sx={{ mb: 4, fontWeight: 'bold', color: '#4caf50' }}>
        FinTrack
      </Typography>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => setView('dashboard')}>
            <ListItemIcon sx={{ color: 'white' }}><DashboardIcon /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
        
        <ListItem disablePadding>
          <ListItemButton onClick={() => setView('transactions')}>
            <ListItemIcon sx={{ color: 'white' }}><ReceiptLongIcon /></ListItemIcon>
            <ListItemText primary="Transactions" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => alert("Próximamente...")}>
            <ListItemIcon sx={{ color: 'white' }}><SettingsIcon /></ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;