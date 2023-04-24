import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, CssBaseline, Typography, AppBar, Toolbar, Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, ThemeProvider } from '@mui/material';
import { styled } from '@mui/system';
import LogoutIcon from '@mui/icons-material/Logout';
import alphaVantageAPI from './alphaVantageAPI';
import InvestmentChart from './InvestmentChart';
import { getRandomPhoto } from './unsplashAPI';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Dashboard.css';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import InfoIcon from '@mui/icons-material/Info';
import HomeIcon from '@mui/icons-material/Home';
import theme from './theme.js'
import { getFinancialNews } from './newsAPI';
import { blue } from '@mui/material/colors';
import backgroundImage from './Fondo_App_1.jpg';
import axios from 'axios';


const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.secondary.main,
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  marginBottom: theme.spacing(3),
}));

const SearchContainer = styled(Grid)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
}));

const SearchInput = styled(TextField)(({ theme }) => ({
  marginRight: theme.spacing(1),
  height: 55,
  backgroundColor: theme.palette.secondary.main,
  borderRadius: 4,
  '& .MuiOutlinedInput-root': {
    '& input': {
      padding: '15.5px 14px',
    },
    '& fieldset': {
      borderColor: '#C4C4C4',
    },
    '&:hover fieldset': {
      borderColor: '#C4C4C4',
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const SearchButton = styled(Button)(({ theme }) => ({
  height: 55,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.secondary.main,
  '&:hover': {
    backgroundColor: '#143752',
  },
}));

const CarouselContainer = styled(Box)(({ theme }) => ({
  minHeight: '200px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const InvestmentTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const StockCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
  padding: theme.spacing(2),
}));

const InvestmentContainer = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(3),
}));

const Footer = styled('footer')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.secondary.main,
  padding: theme.spacing(2),
  marginTop: 'auto',
  textAlign: 'center',
}));

const DrawerWidth = 240;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: DrawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: DrawerWidth,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
  },
}));

const DrawerContainer = styled('div')(({ theme }) => ({
  overflow: 'auto',
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [stocks, setStocks] = useState([]);
  const [investments, setInvestments] = useState([]);
  const [backgroundImageUrl, setBackgroundImageUrl] = useState('');
  const [financialNews, setFinancialNews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRandomPhoto = async () => {
      try {
        const response = await axios.get(
          'https://api.unsplash.com/photos/random',
          {
            params: { client_id: 'QGC9qAzVDoxGmWrPQB9bc1Bvq9mrIcELn7KN3-3QZ0Q' },
          }
        );
        setBackgroundImageUrl(response.data.urls.regular);
      } catch (error) {
        console.error('Error al obtener la imagen de Unsplash:', error);
        setBackgroundImageUrl(backgroundImage);
      }
    };

    fetchRandomPhoto();
  }, []);

  useEffect(() => {
    const fetchFinancialNews = async () => {
      const news = await getFinancialNews();
      setFinancialNews(news);
    };
  
    fetchFinancialNews();
    const intervalId = setInterval(fetchFinancialNews, 600000); // Actualiza cada 60 segundos
  
    return () => {
      clearInterval(intervalId);
    };
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
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <StyledAppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" flexGrow={1}>
              Panel de inversiones
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Cerrar sesión
            </Button>
          </Toolbar>
        </StyledAppBar>
        <StyledDrawer variant="permanent">
    <DrawerContainer>
      <Toolbar />
      <Divider />
      <List>
        {/* ... */}
      </List>
      <Divider />
      <Box sx={{ padding: 3 }}>
        <Typography class="white" variant="h6" align="center" gutterBottom>
          Noticias financieras
        </Typography>
        {financialNews.map((news, index) => (
          <Box key={index} sx={{ marginBottom: 2 }}>
            <Typography variant="body1">
              <a href={news.url} target="_blank" rel="noreferrer">
                {news.title}
              </a>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {news.source.name}
            </Typography>
          </Box>
        ))}
      </Box>
    </DrawerContainer>
  </StyledDrawer>
        <Container>
          <Grid container spacing={4}>
            <SearchContainer item xs={12}>
              <SearchInput
                label="Buscar acciones"
                variant="outlined"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                fullWidth
              />
              <SearchButton variant="contained" onClick={handleSearch}>
                Buscar
              </SearchButton>
            </SearchContainer>
            <Grid item xs={12}>
              <InvestmentTitle variant="h5" align="center">
                Resultados de la búsqueda
              </InvestmentTitle>
              {stocks && stocks.length > 0 ? (
                <Carousel
                  showArrows
                  showStatus={false}
                  showIndicators={false}
                  showThumbs={false}
                  swipeable
                  dynamicHeight
                  >
                  {stocks.map((stock) => (
                    <div key={stock['1. symbol']}>
                      <StockCard>
                        <CardContent>
                          <Typography variant="h6">
                            {stock['1. symbol']} - {stock['2. name']} ({stock['4. region']})
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => handleInvest(stock['1. symbol'], stock['2. name'])}
                            fullWidth
                          >
                            Invertir
                          </Button>
                        </CardActions>
                      </StockCard>
                    </div>
                  ))}
                </Carousel>
              ) : (
                <Typography variant="body1" align="center">
                  No se encontraron acciones. Por favor, realice una búsqueda.
                </Typography>
              )}
            </Grid>
            <InvestmentContainer item xs={12}>
              <Typography variant="h5" align="center" gutterBottom>
                Inversiones realizadas
              </Typography>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <InvestmentChart investments={investments} />
              </Paper>
            </InvestmentContainer>
          </Grid>
        </Container>
        
      </Box>
      <Footer>
          <Typography variant="body2">
            © {new Date().getFullYear()} - DPJP - SC - S
          </Typography>
        </Footer>
    </ThemeProvider>
  );
};

export default Dashboard;


