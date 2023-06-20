import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { API_URL } from '../../config/config';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const User = () => {
  const { userId }: any = useParams();

  const getUser = async (id: number) => {
    return await axios.get<any>(`${API_URL}/users/${id}?_embed=posts&_embed=albums`).then((res) => res.data);
  };

  //   const getUsers = async () => {
  //     return await axios.get<User[]>(`${API_URL}/users?_embed=posts`).then((res) => res.data);
  //   };

  const {
    status,
    error,
    data: user,
  } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUser(Number(userId)),
  });

  if (status === 'loading') return <h1>Loading...</h1>;
  if (status === 'error') return <h1>{JSON.stringify(error)}</h1>;

  console.log(user);

  return (
    <div>
      <h1>{`${user.name} (${user.username})`}</h1>
      <ul>
        <li>Email: {user.email}</li>
        <li>Phone: {user.phone}</li>
        <li>Website: {user.website}</li>
        <li>Company: {user.company.name}</li>
        <li>
          Address:{' '}
          <a href={`https://www.google.com/maps/search/?api=1&query=${user.address.geo.lat},${user.address.geo.lng}`} target="_blank" rel="noreferrer noopener">
            {`${user.address.street} ${user.address.suite} ${user.address.city} (zipcode: ${user.address.zipcode})`}
          </a>
        </li>
      </ul>

      <h1>Posts of {user.name}</h1>
      <ul>
        {user.posts.map((post: any) => (
          <li>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
      <h1>Albums of {user.name}</h1>
      <ul>
        {user.albums.map((album: any) => (
          <li>
            <Link to={`/albums/${album.id}`}>{album.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default User;
