import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource/outfit'; // Defaults to weight 400
import '@fontsource/syne'; // Defaults to weight 400
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/authContext';
import { CookiesProvider } from 'react-cookie';
import { SocketContextProvider } from './context/SocketContext';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AuthContextProvider>
        <SocketContextProvider>

          <App />

        </SocketContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </ThemeProvider>
  // </React.StrictMode>
);
