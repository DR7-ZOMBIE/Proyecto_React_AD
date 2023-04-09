import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  AppBar,
  Toolbar,
  Container,
} from '@mui/material';
import alphaVantageAPI from './alphaVantageAPI';
import InvestmentChart from './InvestmentChart';
import { getRandomPhoto } from './unsplashAPI';


const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [stocks, setStocks] = useState([]);
  const [investments, setInvestments] = useState([]);
  const [backgroundImageUrl, setBackgroundImageUrl] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRandomPhoto = async () => {
      const photoUrl = await getRandomPhoto();
      setBackgroundImageUrl(photoUrl);
    };
  
    fetchRandomPhoto();
  }, []);  


  const handleSearch = async () => {
    const results = await alphaVantageAPI.searchStocks(searchQuery);
    setStocks(results);
  };

  const handleInvest = (symbol, name) => {
    const amount = parseFloat(prompt('Ingrese la cantidad que desea invertir:'));

    if (isNaN(amount)) {
      alert('Por favor, ingrese un número válido.');
      return;
    }

    const newInvestment = {
      id: Date.now(),
      symbol,
      name,
      amount,
    };

    setInvestments([...investments, newInvestment]);
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" flexGrow={1}>
            Panel de inversiones
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Cerrar sesión
          </Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
              <Box display="flex" alignItems="center" justifyContent="center" my={2}>
                <TextField
                  label="Buscar acciones"
                  variant="outlined"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  fullWidth
                />
                <Button variant="contained" color="primary" onClick={handleSearch} sx={{ marginLeft: 1 }}>
                  Buscar
                </Button>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" align="center" gutterBottom>
              Resultados de la búsqueda
            </Typography>
            <Grid container spacing={4}>
              {stocks.map((stock) => (
                <Grid item key={stock['1. symbol']} xs={12} sm={6} md={4}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6">
                        {stock['1. symbol']} - {stock['2. name']} ({stock['4. region']})
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleInvest
                          (stock['1. symbol'], stock['2. name'])}
                          fullWidth
                        >
                          Invertir
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <InvestmentChart investments={investments} />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    );
  };
  
  export default Dashboard;
  