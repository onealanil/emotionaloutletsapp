import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "https://emotionaloutletsbackend.vercel.app/";

const initialState = {
  createPostStatus: "",
  createPostError: "",
  allPost: [],
  allPostStatus: "",
  allPostError: "",
};

//signup
export const createPost = createAsyncThunk(
  "create/post",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(baseUrl + "post/createpost", data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getAllPost = createAsyncThunk(
  "get/allPost",
  async (id = null, { rejectWithValue }) => {
    try {
      const response = await axios.get(baseUrl + "post/allpost");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const postSlice = createSlice({
  name: "posts",
  initialState: initialState,
  extraReducers: {
    [createPost.pending]: (state, action) => {
      return {
        ...state,
        createPostStatus: "pending",
        createPostError: "",
      };
    },
    [createPost.fulfilled]: (state, action) => {
      return {
        ...state,
        createPost: action.payload,
        createPostStatus: "success",
      };
    },
    [createPost.rejected]: (state, action) => {
      return {
        ...state,
        createPostStatus: "failed",
        createPostError: action.payload,
      };
    },
    [getAllPost.pending]: (state, action) => {
      return {
        ...state,
        allPostStatus: "pending",
        allPostError: "",
      };
    },
    [getAllPost.fulfilled]: (state, action) => {
      return {
        ...state,
        allPost: action.payload,
        allPostStatus: "success",
      };
    },
    [getAllPost.rejected]: (state, action) => {
      return {
        ...state,
        allPostStatus: "failed",
        allPostError: action.payload,
      };
    },
  },
});

export default postSlice.reducer;
