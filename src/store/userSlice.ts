import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails: (state: any, actions: any) => {
      state.user = actions.payload;
      console.log(actions.payload);
    },
  },
} as any);

export const { setUserDetails } = userSlice.actions;
export default userSlice.reducer;
