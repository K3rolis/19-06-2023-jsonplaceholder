import React from 'react';
import { API_URL } from '../../config/config';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Albums = () => {
  const getAlbums = async () => {
    return await axios.get(`${API_URL}/albums?&_expand=user&_embed=photos`).then((res) => res.data);
  };

  const {
    status,
    error,
    data: albums,
  } = useQuery({
    queryKey: ['albums'],
    queryFn: getAlbums,
  });

  if (status === 'loading') return <h1>Loading...</h1>;
  if (status === 'error') return <h1>{JSON.stringify(error)}</h1>;

  console.log(albums);

  return (
    <div>
      <h1>Albums</h1>
      <ul>
        {albums &&
          albums.map((album: any) => (
            <li key={album.id}>
              <Link to={`/albums/${album.id}`}>
                {album.title} {album.user.name} {album.photos.length}
                {album.photos.title}
                <img src={album.photos[0].url} alt={album.photos[0].title} height="100px" width="100px" />
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Albums;
