import axios from 'axios';

const accessKey = 'QGC9qAzVDoxGmWrPQB9bc1Bvq9mrIcELn7KN3-3QZ0Q'; // Reemplaza 'YOUR_UNSPLASH_ACCESS_KEY' con tu clave de acceso de Unsplash

const unsplashAPI = axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    Authorization: `Client-ID ${accessKey}`,
  },
});

export const getRandomPhoto = async () => {
  try {
    const response = await unsplashAPI.get('/photos/random');
    return response.data.urls.regular;
  } catch (error) {
    console.error('Error fetching random photo:', error);
    return null;
  }
};

export default unsplashAPI;
