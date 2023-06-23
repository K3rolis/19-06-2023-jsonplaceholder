import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../../api/users';

export type postProps = {
  id?: number;
  title: string;
  body: string;
  userId: null | number;
};

const PostForm = ({ onSubmit, mutationIsLoading, initialValue }: any) => {
  // const { title, body, userId } = initialValue;
  const [post, setPost] = useState<postProps>({
    title: initialValue.title || '',
    body: initialValue.body || '',
    userId: initialValue.userId || null,
  });

  const handleChangeInput = (e: any) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  console.log(post);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    onSubmit(post);

    setPost({
      title: '',
      body: '',
      userId: null,
    });
  };

  const { status, data: users } = useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers(),
    staleTime: Infinity,
  });

  useEffect(() => {
    if (status === 'success' && users) {
      setPost({ ...post, userId: users[0].id });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  if (status === 'loading') return <h1>Loading...</h1>;
  if (status === 'error') return <h1>Something went wrong...</h1>;

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" value={post.title} onChange={handleChangeInput} />
      </div>
      <div className="form-group">
        <label htmlFor="body">Body</label>
        <input type="text" id="body" name="body" value={post.body} onChange={handleChangeInput} />
      </div>

      {users ? (
        <div className="form-group">
          <label htmlFor="user">Body</label>
          <select name="userId" id="user" value={post.userId || ''} onChange={handleChangeInput}>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <h1> Users Not Found, firstly create a user</h1>
      )}

      <input type="submit" value="Submit" disabled={mutationIsLoading} />
    </form>
  );
};

export default PostForm;
