import axios from 'axios';
import { API_URL } from '../config/config';

interface UserProps {
  id: number;
  name: string;
  posts: string[];
}

export const getUsers = async () => {
  return await axios.get<UserProps[]>(`${API_URL}/users`).then((res) => res.data);
};

export const getFirstUser = async () => {
  return await axios.get<UserProps[]>(`${API_URL}/users`).then((res) => res.data);
};
