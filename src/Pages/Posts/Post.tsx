import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { API_URL } from '../../config/config';
import { Link, useParams } from 'react-router-dom';

const Post = () => {
  const { postId } = useParams();

  const getPost = async (id: number) => {
    return await axios.get(`${API_URL}/posts/${id}?_expand=user&_embed=comments`).then((res) => res.data);
  };

  const {
    status,
    error,
    data: post,
  } = useQuery({
    queryKey: ['post', Number(postId)],
    queryFn: () => getPost(Number(postId)),
  });

  if (status === 'loading') return <h1>Loading...</h1>;
  if (status === 'error') return <h1>{JSON.stringify(error)}</h1>;

  console.log(post);

  return (
    <div>
      <h1>{post.title}</h1>
      {post.user && (
        <div>
          <Link to={`/users/${post.user.id}`}>{post.user.name}</Link>
        </div>
      )}
      <p>{post.body}</p>

      {post.user && <Link to={`/posts`}> Others posts by {post.user.name}</Link>}

      <h1>Comments</h1>

      {post.comments && (
        <div>
          {post.comments.length === 0 && <h1>nera</h1>}
          {post.comments.map((comment: any) => (
            <div key={comment.id}>
              <h3>{comment.name}</h3>
              <span>{comment.email}</span>
              <p>{comment.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Post;
