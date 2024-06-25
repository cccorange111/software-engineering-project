import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { reqCategoryList, reqdeleteCategory, reqUpdateCategory, reqAddCategory } from '@/api/index'

const initialState = {
    category: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    isLoadEnd: false,
    message: "",
};

export const getCategory = createAsyncThunk(
    "category/getAll",
    async (_, thunkAPI) => {
        try {
            let user_id = localStorage.getItem('userId');
            let result = await reqCategoryList(user_id);
            //console.log("最后的结果", result);
            return result;
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

export const deleteCategory = createAsyncThunk(
    "category/delete",
    async (id, thunkAPI) => {
        try {
            // const token = thunkAPI.getState().auth.user.token;
            return await reqdeleteCategory(id);
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

export const updateCategory = createAsyncThunk(
    "category/update",
    async (categoryData, thunkAPI) => {
        try {
            let user_id = localStorage.getItem('userId');
            //const token = thunkAPI.getState().auth.user.token;
            return await reqUpdateCategory(
                {
                    ...categoryData,
                    user_id
                }
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
export const addCategory = createAsyncThunk(
    "category/add",
    async (categoryData, thunkAPI) => {
        try {
            let user_id = localStorage.getItem('userId');
            //const token = thunkAPI.getState().auth.user.token;
            return await reqAddCategory(
                {
                    ...categoryData,
                    user_id
                }
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
export const categorySlice = createSlice({
    name: "category",
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
            .addCase(getCategory.pending, (state) => {
                state.isLoading = true;
                state.isLoadEnd = false;
            })
            .addCase(getCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.category = action.payload.rows;
                state.isLoadEnd = true;
            })
            .addCase(getCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isLoadEnd = false;
                state.message = action.payload.msg;
            })
            .addCase(deleteCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.msg;
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload.msg;
            })
            .addCase(updateCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.msg;
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload.msg;
            })
            .addCase(addCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.msg;
            })
            .addCase(addCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload.msg;
            });
    },
});

export const { reset, resetError, resetIsError } = categorySlice.actions;
export default categorySlice.reducer;

