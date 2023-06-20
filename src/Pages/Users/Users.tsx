import React from 'react';
import axios from 'axios';

import { API_URL } from '../../config/config';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const Users = () => {
  // const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   async function fetchData() {
  //     const res = await axios.get(`${API_URL}/users`);
  //     setUsers(res.data);
  //   }

  //   fetchData();
  // }, []);

  interface User {
    id: number;
    name: string;
    posts: string[];
  }

  const getUsers = async () => {
    return await axios.get<User[]>(`${API_URL}/users?_embed=posts`).then((res) => res.data);
  };

  const {
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
      <ul>
        {users &&
          users.map((user: User) => (
            <li key={user.id}>
              <Link to={`/users/${user?.id}`}>
                {user?.name} {user?.posts?.length}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Users;
