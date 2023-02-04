import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/stroe";
import axiosApi from "../axiosApi";
import { Comment, Post, PostApi, PostComment } from "../types";

interface NewsInterface {
  newsArray: PostApi[];
  OnePost: PostApi;
  Comments: Post[];
}

const initialState: NewsInterface = {
  newsArray: [],
  OnePost: {
    id: "",
    title: "",
    text: "",
    image: null,
    date: "",
  },
  Comments: [],
};

export const getPosts = createAsyncThunk<PostApi[]>(
  "news/FetchAllPosts",
  async () => {
    const request = await axiosApi.get("news");

    return request.data;
  }
);

export const setPost = createAsyncThunk<void, Comment>(
  "news/post",
  async (arg) => {
    const formData = new FormData();
    const keys = Object.keys(arg) as (keyof Comment)[];

    keys.forEach((key) => {
      const value = arg[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });

    await axiosApi.post("news", formData);
  }
);

export const DeleteNews = createAsyncThunk<void, string>(
  "news/deleteNews",
  async (arg) => {
    await axiosApi.delete("news/" + arg);
  }
);

export const getOnePost = createAsyncThunk<PostApi, string>(
  "news/One",
  async (arg) => {
    const response = await axiosApi.get("news/" + arg);

    return response.data;
  }
);

export const getAllComments = createAsyncThunk<Post[], string>(
  "news/FetchComments",
  async (arg) => {
    const response = await axiosApi.get("comments?news_id=" + arg);

    return response.data;
  }
);

export const DeleteComments = createAsyncThunk<void, string>('news/deleteComment', async (arg) => {
    await axiosApi.delete('comments/' + arg)
})

export const postOneComment = createAsyncThunk<void, PostComment>('news/postComment', async (arg) => {
    await axiosApi.post('comments/', arg)
})

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.newsArray = action.payload;
    });
    builder.addCase(getOnePost.fulfilled, (state, action) => {
      state.OnePost = action.payload;
    });
    builder.addCase(getAllComments.fulfilled, (state, action) => {
      state.Comments = action.payload;
    });
  },
});

export const newsReducer = newsSlice.reducer;
export const News = (state: RootState) => state.news.newsArray;
export const OneNews = (state: RootState) => state.news.OnePost;
export const Comments = (state: RootState) => state.news.Comments;
