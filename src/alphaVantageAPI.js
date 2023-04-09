import axios from 'axios';

const API_KEY = 'OVAN1GOIDDSBJIWK';

const alphaVantageAPI = {
  searchStocks: async (query) => {
    try {
      const response = await axios.get(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${API_KEY}`
      );

      if (response.data['Note']) {
        console.error('Límite de solicitudes alcanzado:', response.data['Note']);
        return [];
      }

      return response.data.bestMatches;
    } catch (error) {
      console.error('Error al buscar acciones:', error);
      return [];
    }
  },
};

export default alphaVantageAPI;
