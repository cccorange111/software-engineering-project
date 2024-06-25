import { createSlice } from '@reduxjs/toolkit'

export const AdminSlice = createSlice({
  name: 'AdminSlice',
  initialState: {
    token: '',
    account: '',
    password: '',
  },
  reducers: {
    addAdimin: (state, action) => {
      const { token, account, password } = action.payload
      console.log("action.payload", action.payload);
      state.token = token;
      state.account = account;
      state.password = password;
    }
  }
})

export const { addAdimin } = AdminSlice.actions

export default AdminSlice.reducer