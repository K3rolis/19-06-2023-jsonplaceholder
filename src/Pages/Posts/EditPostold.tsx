import React, { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { updatePost, getPost } from '../../api/posts';
import { useNavigate, useParams } from 'react-router-dom';
// import { getUsers } from '../../api/users';
import PostForm from './PostFormOld';

const EditPost = () => {
  const [formData, setFormData] = useState({ title: '', body: '', user: 0 });
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { postId } = useParams();

  useEffect(() => {
    getPost(Number(postId)).then((data) => {
      setFormData({ title: data.title, body: data.body, user: data.userId });
    });
  }, []);

  const updatePostMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: (data) => {
      queryClient.setQueryData(['post', post.id], data);
      navigate(`/posts/${post.id}`);
    },
  });

  //   const { data: users } = useQuery({
  //     queryKey: ['users'],
  //     queryFn: () => getUsers(),
  //     staleTime: Infinity,
  //   });

  const { status, data: post } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => getPost(Number(postId)),
  });

  if (status === 'loading') return <h1>Loading...</h1>;
  if (status === 'error') return <h1>Something went wrong...</h1>;

  if (updatePostMutation.isLoading) return <h1>Saving your changes....</h1>;

  const handleSubmit = (e: any) => {
    e.preventDefault();

    updatePostMutation.mutate({
      id: post.id,
      title: formData.title,
      body: formData.body,
      userId: Number(formData.user),
    });
  };

  console.log(formData);

  return (
    <PostForm
      formData={formData}
      setFormData={setFormData}
      //
      handleSubmit={handleSubmit}
      mutationIsLoading={updatePostMutation.isLoading}
    ></PostForm>
  );
};

export default EditPost;
