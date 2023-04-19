import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Typography, TextField, Button, Paper } from '@mui/material';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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

  const isUsernameTaken = (username) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.some((user) => user.username === username);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const alphanumericRegex = /^[a-zA-Z0-9]+[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/;
    const specialCharacterRegex = /[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

    if (!alphanumericRegex.test(username) || !specialCharacterRegex.test(username)) {
      alert('El nombre de usuario debe contener al menos un carácter alfanumérico seguido de un carácter especial.');
      return;
    }

    if (username && password && confirmPassword) {
      if (isUsernameTaken(username)) {
        alert('El nombre de usuario ya está en uso. Por favor, elige otro.');
      } else if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
      } else {
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
      }
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
              ¿Ya tienes cuenta? <Link to="/login">Iniciar sesión</Link>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default Register;

