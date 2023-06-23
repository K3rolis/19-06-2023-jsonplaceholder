import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { getUser } from '../../api/users';

const User = () => {
  const { userId }: any = useParams();

  const {
    status,
    error,
    data: user,
  } = useQuery({
    queryKey: ['user', Number(userId)],
    queryFn: () => getUser(Number(userId)),
  });

  if (status === 'loading') return <h1>Loading...</h1>;
  if (status === 'error') return <h1>{JSON.stringify(error)}</h1>;

  return (
    <div>
      {user && (
        <>
          <h1>{`${user.name} (${user.username})`}</h1>
          <ul>
            <li>Email: {user.email}</li>
            <li>Phone: {user.phone}</li>
            <li>Website: {user.website}</li>
            <li>Company: {user.company?.name}</li>
            <li>
              Address:
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${user.address?.geo.lat},${user.address?.geo.lng}`}
                target="_blank"
                rel="noreferrer noopener"
              >
                {`${user.address?.street} ${user.address?.suite} ${user.address?.city} (zipcode: ${user.address?.zipcode})`}
              </a>
            </li>
          </ul>
        </>
      )}

      <h1>Posts of {user.name}</h1>
      {user.posts && user.posts.length > 0 ? (
        <ul>
          {user.posts.map((post: any) => (
            <li>
              <Link to={`/posts/${post.id}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <h2>Posts not found</h2>
      )}

      <h1>Albums of {user.name}</h1>
      {console.log(user.albums)}
      {user.albums && user.albums.length > 0 ? (
        <ul>
          {user.albums.map((album: any) => (
            <li>
              <Link to={`/albums/${album.id}`}>{album.title}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <h2>Albums not found</h2>
      )}
    </div>
  );
};

export default User;
