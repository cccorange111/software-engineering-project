import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//import commentService from "./commentService";
import { reqGetComment, reqDeleteComment, reqUpdateComment, reqAddComment } from "@/api/index"
const initialState = {
  comments: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  isLoadEnd: false,
  message: "",
};

export const getComments = createAsyncThunk(
  "comments/getAll",
  async (_, thunkAPI) => {
    try {
      let user_id = localStorage.getItem('userId');
      return await reqGetComment(user_id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comments/delete",
  async (id, thunkAPI) => {
    try {
      // const token = thunkAPI.getState().auth.user.token;
      return await reqDeleteComment(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateComment = createAsyncThunk(
  "comments/update",
  async (commentData, thunkAPI) => {
    try {
      //const token = thunkAPI.getState().auth.user.token;
      return await reqUpdateComment(
        commentData,
      );
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    reset: (state) => initialState,
    resetError: (state) => {
      state.isError = false;
      state.message = "";
    },
    resetIsError: (state) => {
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getComments.pending, (state) => {
        state.isLoading = true;
        state.isLoadEnd = false;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        //console.log("评论", action.payload?.rows);
        state.comments = action.payload?.rows;
        state.message = "";
        state.isLoadEnd = true;
      })
      .addCase(getComments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isLoadEnd = false;
      })
      .addCase(deleteComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        state.message = "成功删除评论";
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(updateComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const published = action.payload.published;
        state.message = published ? "评论已发布" : "已取消发布评论";
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

export const { reset, resetError, resetIsError } = commentSlice.actions;
export default commentSlice.reducer;
