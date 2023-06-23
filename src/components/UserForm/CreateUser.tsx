import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { createUser, createUserProps } from '../../api/users';
import { useNavigate } from 'react-router-dom';
import UserForm from '../../Pages/Users/UserForm';

const CreateUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      queryClient.setQueriesData(['users', data.id], data);
      navigate(`/users/${data.id}`);
    },
  });

  const handleCreateUser = (user: createUserProps) => {
    createUserMutation.mutate({
      ...user,
    });

    console.log(user);
  };

  if (createUserMutation.isLoading) return <h1>Saving User....</h1>;
  return <UserForm onSubmit={handleCreateUser} initialValue={{}} />;
};

export default CreateUser;
