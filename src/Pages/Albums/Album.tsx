import React from 'react';
import { API_URL } from '../../config/config';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import LightGallery from 'lightgallery/react';

// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

// import plugins if you need
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';

const Albums = () => {
  const { albumId } = useParams();

  const getAlbum = async (id: number) => {
    return await axios.get(`${API_URL}/albums/${id}?_expand=user&_embed=photos`).then((res) => res.data);
  };

  const {
    status,
    error,
    data: album,
  } = useQuery({
    queryKey: ['album', albumId],
    queryFn: () => getAlbum(Number(albumId)),
  });

  if (status === 'loading') return <h1>Loading...</h1>;
  if (status === 'error') return <h1>{JSON.stringify(error)}</h1>;

  const onInit = () => {
    console.log('lightGallery has been initialized');
  };

  console.log(album);

  return (
    <div>
      <h1>Album</h1>
      <h2> {album.title}</h2>

      <Link to={`/users/${album.userId}`}>Author: {album.user.name}</Link>

      <div>
        <LightGallery onInit={onInit} speed={500} plugins={[lgThumbnail, lgZoom]}>
          {album.photos.map((photo: any) => (
            <a href={photo.url}>
              <img alt={photo.title} src={photo.thumbnailUrl} />
            </a>
            //   <img key={photo.id} src={photo.thumbnailUrl} alt={photo.title} />
          ))}
        </LightGallery>
      </div>
    </div>
  );
};

export default Albums;
