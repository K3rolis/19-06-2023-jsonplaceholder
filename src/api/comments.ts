import axios from 'axios';
import { API_URL } from '../config/config';

export type newCommentProps = {
  id?: number;
  postId: number;
  name: string;
  email: string;
  body: string;
};

export const createComment = async (newComment: newCommentProps) => {
  return await axios.post(`${API_URL}/comments`, newComment);
};

export const updateComment = async ({ id, ...updatedComment }: newCommentProps) => {
  return await axios.put(`${API_URL}/comments/${id}`, updatedComment);
};

export const deleteComment = async (id: number) => {
  return await axios.delete(`${API_URL}/comments/${id}`);
};

export const getComment = async (id: number) => {
  return await axios.get(`${API_URL}/comments/${id}`).then((res) => res.data);
};
