import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Typography, TextField, Button, Paper } from '@mui/material';
import axios from 'axios'; // Asegúrate de instalar axios con npm install axios

const Login = ({ users }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [backgroundImage, setBackgroundImage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRandomImage = async () => {
      try {
        const response = await axios.get(
          'https://api.unsplash.com/photos/random',
          {
            params: { client_id: 'QGC9qAzVDoxGmWrPQB9bc1Bvq9mrIcELn7KN3-3QZ0Q' },
          }
        );
        setBackgroundImage(response.data.urls.regular);
      } catch (error) {
        console.error('Error al obtener la imagen de Unsplash:', error);
      }
    };

    fetchRandomImage();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(
      (user) => user.username === username && user.password === password
    );
    if (user) {
      navigate('/dashboard');
    } else {
      alert('Credenciales incorrectas o usuario no registrado.');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url('${backgroundImage}')`,
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
          Iniciar sesión
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
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Iniciar sesión
            </Button>
            <Typography align="center">
              ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
