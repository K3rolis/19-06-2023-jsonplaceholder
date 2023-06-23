import React, { ReactElement, ReactNode, useState } from 'react';

const CommentForm = ({ onSubmit, initialValue }: any) => {
  const [comment, setComment] = useState({
    name: initialValue.name || '',
    email: initialValue.email || '',
    body: initialValue.body || '',
    postId: initialValue.postId || null,
  });

  const handleChangeInput = (e: any) => {
    setComment({
      ...comment,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(comment);

    console.log(onSubmit);

    setComment({
      name: '',
      email: '',
      body: '',
      postId: null,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">name</label>
        <input type="text" id="name" name="name" value={comment.name} onChange={handleChangeInput} />
      </div>

      <div className="form-group">
        <label htmlFor="email">email</label>
        <input type="text" id="email" name="email" value={comment.email} onChange={handleChangeInput} />
      </div>

      <div className="form-group">
        <label htmlFor="body">body</label>
        <textarea id="body" name="body" value={comment.body} onChange={handleChangeInput}></textarea>
      </div>

      <input type="submit" value="submit" />
    </form>
  );
};

export default CommentForm;
