import React, { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { updatePost, getPost } from '../../api/posts';
import { useNavigate, useParams } from 'react-router-dom';
import { getUsers } from '../../api/users';

const EditPost = () => {
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [user, setUser] = useState<any>();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { postId } = useParams();

  useEffect(() => {
    getPost(Number(postId)).then((data) => {
      setTitle(data.title);
      setBody(data.body);
      setUser(data.user);
    });
  }, [postId]);

  const updatePostMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: (data) => {
      queryClient.setQueryData(['post', post.id], data);
      navigate(`/posts/${post.id}`);
    },
  });

  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers(),
    staleTime: Infinity,
  });

  const { status, data: post } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => getPost(Number(postId)),
    enabled: users != null,
  });

  if (status === 'loading') return <h1>Loading...</h1>;
  if (status === 'error') return <h1>Something went wrong...</h1>;

  if (updatePostMutation.isLoading) return <h1>Saving your changes....</h1>;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    updatePostMutation.mutate({
      id: post.id,
      title: title,
      body: body,
      userId: user,
    });
  };

  return (
    <div>
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

        <input type="submit" value="Submit" disabled={updatePostMutation.isLoading} />
      </form>
    </div>
  );
};

export default EditPost;
