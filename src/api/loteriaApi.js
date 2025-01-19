import axios from 'axios';

const API_URL = 'https://rotaract-loteria-backend-3c90567e12a3.herokuapp.com/api';

export const getLoteriaCard = async () => {
  try {
    const response = await axios.get(`${API_URL}/card`);
    return response.data.card;
  } catch (error) {
    console.error('Error fetching card:', error);
    throw error;
  }
};
