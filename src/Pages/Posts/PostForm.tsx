import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createPost } from '../../api/posts';
import { useNavigate } from 'react-router-dom';
import { getUsers } from '../../api/users';

const PostForm = () => {
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [user, setUser] = useState<any>();
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

  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers(),
    staleTime: Infinity,
  });

  if (!user && users) {
    setUser(users[0].id);
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    createPostMutation.mutate({
      title: title,
      body: body,
      userId: user,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="body">Body</label>
        <input type="text" id="body" name="body" value={body} onChange={(e) => setBody(e.target.value)} />
      </div>

      <div className="form-group">
        <label htmlFor="user">Body</label>
        <select name="user" id="user" value={user} onChange={(e) => setUser(Number(e.target.value))}>
          {users &&
            users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
        </select>
      </div>

      <input type="submit" value="Submit" disabled={createPostMutation.isLoading} />
    </form>
  );
};

export default PostForm;
