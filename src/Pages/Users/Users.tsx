import React from 'react';
import axios from 'axios';

import { API_URL } from '../../config/config';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteUser } from '../../api/users';

const Users = () => {
  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => refetch(),
    // setPage(getLastPage(users));
  });

  interface User {
    id: number;
    name: string;
    posts: string[];
  }

  const getUsers = async () => {
    return await axios.get<User[]>(`${API_URL}/users?_embed=posts`).then((res) => res.data);
  };

  const {
    refetch,
    status,
    error,
    data: users,
  } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  if (status === 'loading') return <h1>Loading...</h1>;
  if (status === 'error') return <h1>{JSON.stringify(error)}</h1>;

  console.log(users);

  return (
    <div>
      <h1>Users:</h1>
      <Link to={`/users/create`}>Create New User</Link>
      <ul>
        {users &&
          users.map((user: User) => (
            <li key={user.id}>
              <Link to={`/users/${user?.id}`}>
                {user?.name} {user?.posts?.length}
              </Link>
              <Link to={`/users/edit/${user.id}`}> EDIT</Link>
              <button disabled={deleteUserMutation.isLoading} onClick={() => deleteUserMutation.mutate(user.id)}>
                DELETE
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Users;
