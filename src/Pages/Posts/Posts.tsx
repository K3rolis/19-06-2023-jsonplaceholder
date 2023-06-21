import React, { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { getPosts, deletePost } from '../../api/posts';
import { getLastPage } from '../../api/pagination';
import { API_URL } from '../../config/config';

const Posts = () => {
  const [page, setPage] = useState(1);

  const {
    refetch,
    status,
    data: posts,
  } = useQuery({
    queryKey: ['posts', { page }],
    keepPreviousData: true,
    queryFn: () => getPosts(page),
  });

  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      refetch();
      setPage(getLastPage(posts));
    },
  });

  if (status === 'loading') return <h1>Loading...</h1>;
  if (status === 'error') return <h1>Something went wrong...</h1>;

  console.log(posts);

  return (
    <div>
      <h1>Posts</h1>
      <Link to={`/posts/create`}>Create New Post </Link>
      <ul>
        {posts.posts?.map((post: any) => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>
              {post.title} {post.user.name} {post.comments.length}
            </Link>
            <Link to={`/posts/edit/${post.id}`}> EDIT</Link>
            <button disabled={deletePostMutation.isLoading} onClick={() => deletePostMutation.mutate(post.id)}>
              DELETE
            </button>
          </li>
        ))}
      </ul>

      {posts.previousPage && <button onClick={() => setPage(posts.previousPage)}>Previous</button>}
      {posts.nextPage && <button onClick={() => setPage(posts.nextPage)}>Next</button>}
    </div>
  );
};

export default Posts;
