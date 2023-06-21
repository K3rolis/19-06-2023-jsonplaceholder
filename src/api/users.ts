import axios from 'axios';
import { API_URL } from '../config/config';

interface UserProps {
  id: number;
  name: string;
  posts: string[];
}

type createPostProps = {
  id?: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

export const createUser = async (newUser: createPostProps) => {
  return await axios.post(`${API_URL}/users`, newUser).then((res) => res.data);
};

export const deleteUser = async (id: number) => {
  return await axios.delete(`${API_URL}/users/${id}`);
};

export const updateUser = async ({ id, ...data }: createPostProps) => {
  return await axios.put(`${API_URL}/users/${id}`, { ...data });
};

export const getUsers = async () => {
  return await axios.get<UserProps[]>(`${API_URL}/users`).then((res) => res.data);
};

export const getUser = async (id: number) => {
  return await axios.get(`${API_URL}/users/${id}`).then((res) => res.data);
};

export const getFirstUser = async () => {
  return await axios.get<UserProps[]>(`${API_URL}/users`).then((res) => res.data);
};
