import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  CssBaseline,
  Typography,
  AppBar,
  Toolbar,
  ThemeProvider,
} from "@mui/material";
import { styled } from "@mui/system";
import alphaVantageAPI from "./alphaVantageAPI";
import InvestmentChart from "./InvestmentChart";
import { getRandomPhoto } from "./unsplashAPI";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Dashboard.css";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Paper from "@mui/material/Paper";
import theme from "./theme.js";
import { getFinancialNews } from "./newsAPI";
import backgroundImage from "./Fondo_App_1.jpg";
import axios from "axios";
import Grow from "@mui/material/Grow";
import Slide from "@mui/material/Slide";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.secondary.main,
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  marginBottom: theme.spacing(3),
}));

const NewsTextContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  borderRadius: 4,
  padding: theme.spacing(1),
}));

const SearchContainer = styled(Grid)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  display: "flex",
  alignItems: "center",
}));

const SearchInput = styled(TextField)(({ theme }) => ({
  marginRight: theme.spacing(1),
  height: 55,
  backgroundColor: theme.palette.secondary.main,
  borderRadius: 4,
  "& .MuiOutlinedInput-root": {
    "& input": {
      padding: "15.5px 14px",
    },
    "& fieldset": {
      borderColor: "#C4C4C4",
    },
    "&:hover fieldset": {
      borderColor: "#C4C4C4",
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const SearchButton = styled(Button)(({ theme }) => ({
  height: 55,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.secondary.main,
  "&:hover": {
    backgroundColor: "#143752",
  },
  transition: "all 0.9s ease",
  "&:hover": {
    backgroundColor: "#143752",
    transform: "scale(1.05)",
  },
}));

const CarouselContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  padding: theme.spacing(2),
  // backgroundColor: "rgba(0, 0, 0, 0.3)", // Agregar esta línea
}));
const InvestmentTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const StockCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "100%",
  padding: theme.spacing(2),
  // backgroundColor: "rgba(0, 0, 0, 0.7)", // Agregar esta línea
}));

const InvestmentContainer = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(3),
}));

const Footer = styled("footer")(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.secondary.main,
  padding: theme.spacing(2),
  marginTop: "auto",
  textAlign: "center",
}));

const Dashboard = () => {
  const [investments, setInvestments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [stocks, setStocks] = useState([]);
  const [backgroundImageUrl, setBackgroundImageUrl] = useState("");
  const [financialNews, setFinancialNews] = useState([]);
  const navigate = useNavigate();
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const fetchRandomPhoto = async () => {
      try {
        const response = await axios.get(
          "https://api.unsplash.com/photos/random",
          {
            params: {
              client_id: "QGC9qAzVDoxGmWrPQB9bc1Bvq9mrIcELn7KN3-3QZ0Q",
            },
          }
        );
        setBackgroundImageUrl(response.data.urls.regular);
      } catch (error) {
        console.error("Error al obtener la imagen de Unsplash:", error);
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
    console.log("API Results:", results);
    if (results) {
      const stocksData = results.map((stock) => {
        return {
          id: stock.id,
          symbol: stock["1. symbol"],
          name: stock["2. name"],
        };
      });
      setStocks(stocksData);
      setHasSearched(true); // Añade esta línea
    }
  };

  const handleInvest = (symbol, name) => {
    const amount = parseFloat(
      prompt("Ingrese la cantidad que desea invertir:")
    );
    if (isNaN(amount)) {
      alert("Por favor, ingrese un número válido.");
      return;
    }

    const newInvestment = {
      id: Date.now(),
      symbol,
      name,
      amount,
    };

    setInvestments((prevInvestments) => [...prevInvestments, newInvestment]);
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundImage: `url(${financialNews.urlToImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
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
        <Container>
          <CssBaseline />
          <SearchContainer>
            <SearchInput
              fullWidth
              label="Buscar acciones"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <SearchButton variant="contained" onClick={handleSearch}>
              Buscar
            </SearchButton>
          </SearchContainer>
          <CarouselContainer>
            <Carousel autoPlay={!hasSearched} infiniteLoop interval={5000}>
              {hasSearched ? (
                stocks &&
                Array.isArray(stocks) &&
                stocks.length > 0 &&
                stocks.map((stock) => (
                  <Grow in key={stock.id} timeout={500}>
                    <StockCard>
                      <CardContent>
                        <Typography variant="h6">{stock.symbol}</Typography>
                        <Typography variant="subtitle1">
                          {stock.name}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          size="small"
                          color="primary"
                          onClick={() => handleInvest(stock.symbol, stock.name)}
                        >
                          Invertir
                        </Button>
                      </CardActions>
                    </StockCard>
                  </Grow>
                ))
              ) : (
                <Grow in timeout={500}>
                  <StockCard>
                    <CardContent>
                      <Typography variant="h6">
                        No se ha realizado una búsqueda
                      </Typography>
                      <Typography variant="subtitle1">
                        Utilice el cuadro de búsqueda para encontrar acciones.
                      </Typography>
                    </CardContent>
                  </StockCard>
                </Grow>
              )}
            </Carousel>
          </CarouselContainer>
          <InvestmentTitle variant="h4">Inversiones realizadas</InvestmentTitle>
          <InvestmentContainer container spacing={3}>
            {Array.isArray(investments) &&
              investments.length > 0 &&
              investments.map((investment) => (
                <Grid key={investment.id} item xs={12} sm={6} md={4} lg={3}>
                  <InvestmentChart investments={investment} />
                </Grid>
              ))}
          </InvestmentContainer>
          <CarouselContainer>
            <Carousel autoPlay infiniteLoop interval={5000}>
              {financialNews &&
                financialNews.map((newsItem) => (
                  <Slide in key={newsItem.url} direction="left" timeout={500}>
                    <Paper
                      sx={{
                        backgroundImage: `url(${newsItem.urlToImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: 200,
                        position: "relative",
                      }}
                    >
                      <NewsTextContainer>
                        <Typography variant="h6" color="secondary">
                          {newsItem.title}
                        </Typography>
                        <Typography variant="subtitle2" color="secondary">
                          {newsItem.source.name}
                        </Typography>
                      </NewsTextContainer>
                    </Paper>
                  </Slide>
                ))}
            </Carousel>
          </CarouselContainer>
        </Container>
        <Footer>
          <Typography variant="body2">
            © {new Date().getFullYear()} - Inversiones App
          </Typography>
        </Footer>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
