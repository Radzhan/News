import { Button, TextField } from "@mui/material";
import dayjs from "dayjs";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import CardComment from "../../components/CardComment/CardComment";
import {
  Comments,
  DeleteComments,
  getAllComments,
  getOnePost,
  OneNews,
  postOneComment,
} from "../../store/news";

const Comment = () => {
  const { id } = useParams();
  const posts = useAppSelector(OneNews);
  const comments = useAppSelector(Comments);
  const dispatch = useAppDispatch();
  const [comment, setComment] = useState({
    author: "",
    text: "",
    post_id: id!,
  });

  const postArray = useCallback(async () => {
    await dispatch(getOnePost(id!));
    await dispatch(getAllComments(id!));
  }, [dispatch]);

  useEffect(() => {
    postArray().catch(console.error);
  }, [postArray]);
  const deleteComment = async (arg: string) => {
    await dispatch(DeleteComments(arg));
    await dispatch(getAllComments(id!));
  };

  const onCardChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setComment((prev) => ({ ...prev, [name]: value }));
  };

  let onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await dispatch(postOneComment(comment));
    await dispatch(getAllComments(id!));
  };

  const createComment = comments.map((comment) => {
    return (
      <CardComment
        author={comment.author}
        text={comment.text}
        key={comment.id}
        onDelete={() => {
          deleteComment(comment.id);
        }}
      ></CardComment>
    );
  });
  return (
    <div>
      <h3>{posts.title}</h3>
      <b>{dayjs(posts.date).format("DD.MM.YYYY HH:mm:ss")}</b>
      <p>{posts.text}</p>
      <h4>Comments</h4>
      {comments.length !== 0 ? createComment : "no Comments"}

      <form onSubmit={onFormSubmit}>
        <TextField
          id="outlined-basic"
          name="author"
          value={comment.author}
          onChange={onCardChange}
          label="Author"
          variant="outlined"
        />
        <TextField
          id="outlined-basic"
          label="Comment"
          required
          variant="outlined"
          name="text"
          value={comment.text}
          onChange={onCardChange}
        />
        <Button variant="outlined" type="submit">Sade</Button>
      </form>
    </div>
  );
};

export default Comment;
