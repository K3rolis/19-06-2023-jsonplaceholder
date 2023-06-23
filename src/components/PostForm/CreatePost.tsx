import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost } from '../../api/posts';
import { useNavigate } from 'react-router-dom';
import PostForm from '../../Pages/Posts/PostForm';

const CreatePost = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      queryClient.setQueryData(['posts', data.id], data);
      queryClient.invalidateQueries(['posts'], { exact: true });
      navigate(`/posts/${data.id}`);
    },
  });

  const handleCreatePost = (post: any) => {
    createPostMutation.mutate({
      ...post,
      userId: Number(post.userId),
    });
  };

  return <PostForm onSubmit={handleCreatePost} initialValue={{}} mutationIsLoading={createPostMutation.isLoading} />;
};

export default CreatePost;
