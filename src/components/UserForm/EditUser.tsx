import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createUserProps, getUser, updateUser } from '../../api/users';
import { useNavigate, useParams } from 'react-router-dom';
import UserForm from '../../Pages/Users/UserForm';

const EditUser = () => {
  const { userId } = useParams();

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    isLoading,
    isError,
    data: user,
  } = useQuery({
    queryKey: ['user', Number(userId)],
    queryFn: () => getUser(Number(userId)),
  });

  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      queryClient.setQueriesData(['users', Number(userId)], data);
      navigate(`/users/${Number(userId)}`);
    },
  });

  const handleSubmit = (user: createUserProps) => {
    updateUserMutation.mutate({ ...user, id: Number(userId) });
  };

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>{`Error: `}</h1>;
  if (updateUserMutation.isLoading) return <h1>Saving your changes....</h1>;

  return <UserForm onSubmit={handleSubmit} initialValue={user} />;
};

export default EditUser;
