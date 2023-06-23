import React, { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { API_URL } from '../../config/config';
import { Link, useParams } from 'react-router-dom';
import { createComment, deleteComment, updateComment } from '../../api/comments';
import CommentForm from '../../components/CommentsForm/CommentForm';

const Post = () => {
  const { postId } = useParams();
  const [showForm, setShowForm] = useState(false);
  const [editForm, setEditForm] = useState(null);

  // const queryClient = useQueryClient();
  console.log(postId);

  const getPost = async (id: number) => {
    return await axios.get(`${API_URL}/posts/${id}?_expand=user&_embed=comments`).then((res) => res.data);
  };

  const {
    refetch,
    isError,
    isLoading,
    error,
    data: post,
  } = useQuery({
    queryKey: ['post', Number(postId)],
    queryFn: () => getPost(Number(postId)),
  });

  const deleteCommentMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => refetch(),
  });

  const createCommentMutation = useMutation({
    mutationFn: createComment,
    onSuccess: () => refetch(),
  });

  const updateCommentMutation = useMutation({
    mutationFn: updateComment,
    onSuccess: () => refetch(),
  });

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>{JSON.stringify(error)}</h1>;
  if (updateCommentMutation.isLoading || createCommentMutation.isLoading || deleteCommentMutation.isLoading) return <h1>Saving your changes....</h1>;

  const handleSubmit = (comment: any) => {
    if (editForm) {
      updateCommentMutation.mutate({
        id: editForm,
        ...comment,
        postId: Number(postId),
      });
    } else {
      createCommentMutation.mutate({
        ...comment,
        postId: Number(postId),
      });
    }

    setShowForm(false);
    setEditForm(null);
  };

  return (
    <div>
      {
        <>
          <h1>{post?.title}</h1>
          <div>
            <Link to={`/users/${post.user.id}`}>{post.user.name}</Link>
          </div>
          <p>{post.body}</p>
          {post.user && <Link to={`/posts`}> Others posts by {post.user.name}</Link>}
        </>
      }

      {post?.comments && (
        <div>
          <h1>Comments</h1>

          <button onClick={() => [setShowForm(!showForm), setEditForm(null)]}>{showForm ? 'Hide Form' : 'Show Form'}</button>
          {showForm && <CommentForm onSubmit={handleSubmit} initialValue={{}} />}
          {post.comments?.length === 0 && <h1>Not..</h1>}
          {post.comments?.map((comment: any) => (
            <div key={comment.id}>
              <h3>{comment.name}</h3>
              <div>
                <button
                  onClick={() => {
                    deleteCommentMutation.mutate(comment.id);
                  }}
                >
                  Delete
                </button>
                <button onClick={() => [setEditForm(comment.id), setShowForm(false)]}>EDIT</button>
                {editForm === comment.id && <CommentForm onSubmit={handleSubmit} initialValue={comment} />}
              </div>
              <span>{comment.email}</span>
              <p>{comment.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Post;
