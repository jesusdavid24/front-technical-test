import axios from "axios";

const URL = `${import.meta.env.VITE_BASE_URL}`;

export const fetchUsers = async () => {
  try {
    const { data } = await axios.get(`${URL}/users`);
    return data;
  } catch(error) {
    console.log(error)
    return []
  }
};

export const saveUsers = async (form) => {
  try {
    const { data } = await axios.post(`${URL}/users`, form);
    return data;
  } catch (error) {
    return error.message;
  }
};