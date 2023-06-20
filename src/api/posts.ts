import axios from 'axios';
import { API_URL } from '../config/config';

const POSTS_LIMIT = 10;

type createPostProps = {
  id?: number;
  title: string;
  body: string;
  userId: number;
};

export const createPost = async ({ title, body, userId }: createPostProps) => {
  return await axios
    .post(`${API_URL}/posts`, {
      title,
      body,
      userId,
    })
    .then((res) => res.data);
};

export const updatePost = async ({ id, title, body, userId }: createPostProps) => {
  return await axios
    .put(`${API_URL}/posts/${id}`, {
      title,
      body,
      userId,
    })
    .then((res) => res.data);
};

export const getPosts = async (page: number) => {
  return await axios
    .get(`${API_URL}/posts?&_expand=user&_embed=comments`, {
      params: { _page: page, _sort: 'id', _limit: POSTS_LIMIT, _direction: 'DESC' },
    })
    .then((res) => {
      const hasNext = page * POSTS_LIMIT + 1 <= parseInt(res.headers['x-total-count']);
      return {
        nextPage: hasNext ? page + 1 : (undefined as any),
        previousPage: page > 1 ? page - 1 : (undefined as any),
        posts: res.data,
        totalPages: Math.round(parseInt(res.headers['x-total-count']) / POSTS_LIMIT),
        total: res.headers['x-total-count'],
      };
    });
};

export const getPost = async (id: number) => {
  return await axios.get(`${API_URL}/posts/${id}`).then((res) => {
    // setTitle(res.data.title);
    // setBody(res.data.body);
    // setUser(res.data.user);

    return res.data;
  });
};

export const deletePost = async (id: number) => {
  return await axios.delete(`${API_URL}/posts/${id}`);
};
