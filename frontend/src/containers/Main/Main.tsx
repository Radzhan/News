import React, { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import CardNews from "../../components/CardNews/CardNews";
import { DeleteNews, getPosts, News } from "../../store/news";

const Main = () => {
  const posts = useAppSelector(News);
  const dispatch = useAppDispatch();

  const postArray = useCallback(async () => {
    await dispatch(getPosts());
  }, [dispatch]);

  useEffect(() => {
    postArray().catch(console.error);
  }, [postArray]);

  const deletePost = async (arg: string) => {
    await dispatch(DeleteNews(arg));
    await dispatch(getPosts());
  };

  const createPosts = posts.map((element) => {
    return (
      <CardNews
        id={element.id}
        title={element.title}
        image={element.image}
        date={element.date}
        key={element.id}
        onDelete={() => {deletePost(element.id)}}
      ></CardNews>
    );
  });
  return (
    <div>
      <h2>Posts</h2>
      <Link to={"/add"}>Create new Post</Link>
      {createPosts}
    </div>
  );
};

export default Main;
