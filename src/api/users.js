import axios from 'axios';

const URL = `${import.meta.env.VITE_BASE_URL_GITHUB}`;

export const getUsers = async (userName) => {
  try {
    const { data } = await axios.get(`${URL}/search/users?q=${userName}`);
    return data.items;
  } catch (error) {
    throw new Error(error);
  }
};

export const getUserProfile = async (userName) => {
  try {
    const { data } = await axios.get(`${URL}/users/${userName}`);
    return data
  } catch (error) {
    throw new Error(error);
  }
};