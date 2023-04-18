import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "https://emotionaloutletsbackend.vercel.app/";

const initialState = {
  allComment: [],
  allCommentStatus: "",
  allCommentError: "",
};

export const addComment = createAsyncThunk(
  "post/comment",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseUrl}/${data.postId}/comment`,
        data
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const commentSlice = createSlice({
  name: "postComment",
  initialState: initialState,
  extraReducers: {
    [addComment.pending]: (state, action) => {
      return {
        ...state,
        allCommentStatus: "pending",
        allCommentError: "",
      };
    },
    [addComment.fulfilled]: (state, action) => {
      return {
        ...state,
        allComment: [action.payload, ...state.allComment],
        allCommentStatus: "success",
      };
    },
    [addComment.rejected]: (state, action) => {
      return {
        ...state,
        allCommentStatus: "failed",
        allCommentError: action.payload,
      };
    },
  },
});

export default commentSlice.reducer;
