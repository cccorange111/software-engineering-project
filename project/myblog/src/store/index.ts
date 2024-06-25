import { configureStore } from '@reduxjs/toolkit'
import AdminReducer from "@/store/AdminSlice/AdminSlice.ts"
import CommentReducer from "@/store/Comments/commentSlice"
import CategoryReducer from "@/store/Category/CategorySlice"
export default configureStore({
  reducer: {
    Admin: AdminReducer,
    Comment: CommentReducer,
    Category: CategoryReducer
  }
})

