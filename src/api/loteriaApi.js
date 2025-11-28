import axios from 'axios';

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const getLoteriaCard = async () => {
  try {
    const response = await axios.get(`${API_URL}/card`);
    return response.data.card;
  } catch (error) {
    console.error('Error fetching card:', error);
    throw error;
  }
};
