import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Typography, TextField, Button, Paper } from '@mui/material';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();


  const handleSubmit = (event) => {
    event.preventDefault();
    if (username && password) {
      let users = localStorage.getItem('users');
      if (users) {
        users = JSON.parse(users);
      } else {
        users = [];
      }

      users.push({ username, password });
      localStorage.setItem('users', JSON.stringify(users));
      alert('Usuario registrado con éxito. Por favor, inicie sesión.');
      navigate('/login');
    } else {
      alert('Por favor, complete todos los campos.');
    }
  };

  return (
    <Box
    sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundImage: `url('https://source.unsplash.com/random/1600x900')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
    <Paper
      sx={{
        padding: 4,
      }}
      elevation={3}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Registrarse
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            '& > *': {
              marginBottom: 2,
            },
          }}
        >
          <TextField
            label="Nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Confirmar contraseña"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            variant="outlined"
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Registrarse
          </Button>
          <Typography align="center">
            ¿Ya tienes cuenta? <Link to="/">Iniciar sesión</Link>
          </Typography>
        </Box>
      </form>
    </Paper>
  </Box>
);
};

export default Register;
