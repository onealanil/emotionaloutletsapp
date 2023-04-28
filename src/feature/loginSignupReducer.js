import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "https://emotionaloutletsserver.onrender.com/";

const initialState = {
  loginUserDetails: [],
  signupUserDetails: [],

  loginStatus: "",
  loginError: "",

  signupStatus: "",
  signupError: "",
};

//login
export const loginUser = createAsyncThunk(
  "login/user",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(baseUrl + "signin", data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

//signup
export const signupUser = createAsyncThunk(
  "signup/user",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(baseUrl + "signup", data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const loginSignupSlice = createSlice({
  name: "loginSignup",
  initialState: initialState,
  extraReducers: {
    [loginUser.pending]: (state, action) => {
      return {
        ...state,
        loginStatus: "pending",
        loginError: "",
        signupError: "",
        signupStatus: "",
        updateUserStatus: "",
        updateUserError: "",
      };
    },
    [loginUser.fulfilled]: (state, action) => {
      return {
        ...state,
        loginUserDetails: [action.payload, ...state.loginUserDetails],
        signupUserDetails: [],
        userOneList: [],
        loginStatus: "success",
        loginError: "",
        signupStatus: "",
        signupError: "",
        updateUserStatus: "",
        updateUserError: "",
      };
    },
    [loginUser.rejected]: (state, action) => {
      return {
        ...state,
        loginStatus: "failed",
        loginError: action.payload,
        signupStatus: "",
        signupError: "",
      };
    },
    [signupUser.pending]: (state, action) => {
      return {
        ...state,
        loginStatus: "",
        loginError: "",
        signupError: "",
        signupStatus: "pending",
      };
    },
    [signupUser.fulfilled]: (state, action) => {
      return {
        ...state,
        loginUserDetails: [],
        signupUserDetails: [action.payload, ...state.signupUserDetails],
        userOneList: [],
        loginStatus: "",
        loginError: "",
        signupStatus: "success",
        signupError: "",
      };
    },
    [signupUser.rejected]: (state, action) => {
      return {
        ...state,
        loginStatus: "",
        loginError: "",
        signupStatus: "failed",
        signupError: action.payload
          ? action.payload.message
          : "Unknown error occurred",
      };
    },
  },
});

export default loginSignupSlice.reducer;
