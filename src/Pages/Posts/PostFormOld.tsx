import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../../api/users';

const PostForm = ({ handleSubmit, mutationIsLoading, formData, setFormData, postId }: any) => {
  // const queryClient = useQueryClient();
  const { status, data: users } = useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers(),
    staleTime: Infinity,
  });

  useEffect(() => {
    getUsers().then((data) => setFormData({ user: data[0].id }));
  }, []);

  if (status === 'loading') return <h1>Loading...</h1>;
  if (status === 'error') return <h1>Something went wrong...</h1>;

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
      </div>
      <div className="form-group">
        <label htmlFor="body">Body</label>
        <input type="text" id="body" name="body" value={formData.body} onChange={(e) => setFormData({ ...formData, body: e.target.value })} />
      </div>

      <div className="form-group">
        <label htmlFor="user">Body</label>
        <select name="user" id="user" value={formData.user} onChange={(e) => setFormData({ ...formData, user: Number(e.target.value) })}>
          {users &&
            users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
        </select>
      </div>

      <input type="submit" value="Submit" disabled={mutationIsLoading} />
    </form>
  );
};

export default PostForm;
