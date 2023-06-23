import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { updatePost, getPost } from '../../api/posts';
import { useNavigate, useParams } from 'react-router-dom';
import PostForm from '../../Pages/Posts/PostForm';

const EditPost = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { postId } = useParams();

  const updatePostMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: (data) => {
      // queryClient.setQueryData(['post', postId], data);
      queryClient.invalidateQueries(['posts', postId], data);
      navigate(`/posts/${post.id}`);
    },
  });

  const {
    isLoading,
    isError,
    data: post,
  } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => getPost(Number(postId)),
  });

  if (updatePostMutation.isLoading) return <h1>Saving your changes....</h1>;

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>{`Error: `}</h1>;

  const handleUpdatePost = (post: any) => {
    console.log(post.id);
    updatePostMutation.mutate({ ...post, id: Number(postId) });
  };

  return <PostForm onSubmit={handleUpdatePost} initialValue={post} mutationIsLoading={updatePostMutation.isLoading}></PostForm>;
};

export default EditPost;
