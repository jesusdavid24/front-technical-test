import axios from 'axios';

const URL = `${import.meta.env.VITE_BASE_URL_GITHUB}`;

export const getUsers = async (userName) => {
  try {
    const { data } = await axios.get(`${URL}/users?q=${userName}`);
    console.log(data);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};