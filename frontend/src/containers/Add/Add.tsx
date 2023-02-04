import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import InputBtn from "../../components/InputBtn/InputBtn";
import { setPost } from "../../store/news";

const Add = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [news, setNews] = useState({
    title: "",
    text: "",
    image: null,
  });
  const onCardChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNews((prev) => ({ ...prev, [name]: value }));
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files && files[0]) {
      setNews((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    } else {
      setNews((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };
  let onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await dispatch(setPost(news));
    navigate('/')
  };
  return (
    <div>
      <NavLink to={"/"}>News</NavLink>
      <h2>Add new post</h2>
      <form onSubmit={onFormSubmit}>
        <div>
          <TextField
            id="outlined-basic"
            label="Title"
            required
            variant="outlined"
            name="title"
            value={news.title}
            onChange={onCardChange}
          />
        </div>
        <div>
          <TextField
            id="standard-multiline-static"
            label="Text"
            multiline
            rows={4}
            variant="standard"
            required
            name="text"
            value={news.text}
            onChange={onCardChange}
            sx={{ my: 5 }}
          />
        </div>

        <InputBtn
          onChange={fileInputChangeHandler}
          name={"image"}
          label={"Image"}
        ></InputBtn>
        <Button variant="contained" type="submit" sx={{ mt: 5 }}>
          Save
        </Button>
      </form>
    </div>
  );
};

export default Add;
