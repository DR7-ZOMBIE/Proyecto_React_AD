import axios from 'axios';

const API_KEY = '57a17c2558e54f8c8c22c4d3ad3ea9b5';
const BASE_URL = 'https://newsapi.org/v2';

export const getFinancialNews = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/top-headlines`, {
      params: {
        apiKey: API_KEY,
        category: 'business',
        language: 'en',
      },
    });

    return response.data.articles;
  } catch (error) {
    console.error('Error al obtener noticias financieras:', error);
    return [];
  }
};
