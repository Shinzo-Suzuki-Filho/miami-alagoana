import axios from 'axios';

const WEATHER_API_KEY = "da2054a0056637380908865611649231"; // Exemplo de chave (OpenWeather ou similar)

export const getWeather = async (city: string = 'Maceio') => {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},BR&units=metric&appid=${WEATHER_API_KEY}&lang=pt_br`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar clima:', error);
    return null;
  }
};
