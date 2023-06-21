import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createPost } from '../../api/posts';
import { useNavigate } from 'react-router-dom';
import { getUsers } from '../../api/users';
import PostForm from './PostFormOld';

const CreatePost = () => {
  const [formData, setFormData] = useState({ title: '', body: '', user: 0 });
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      queryClient.setQueryData(['posts', data.id], data);
      queryClient.invalidateQueries(['posts'], { exact: true });
      navigate(`/posts/${data.id}`);
      console.log(data);
    },
  });

  // const { data: users } = useQuery({
  //   queryKey: ['users'],
  //   queryFn: () => getUsers(),
  //   staleTime: Infinity,
  // });

  // if (!user && users) {
  //   setUser(users[0].id);
  // }

  const handleSubmit = (e: any) => {
    e.preventDefault();

    createPostMutation.mutate({
      title: formData.title,
      body: formData.body,
      userId: Number(formData.user),
    });
  };

  return (
    <PostForm
      formData={formData}
      setFormData={setFormData}
      // titleHandler={(e: any) => setTitle(e.target.value)}
      // title={title}
      handleSubmit={handleSubmit}
      mutationIsLoading={createPostMutation.isLoading}
    />
  );
};

export default CreatePost;
