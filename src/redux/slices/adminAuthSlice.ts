import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Admin {
  id: string;
  email: string;
}

interface AdminAuthState {
  admin: Admin | null;
  isAuthenticated: boolean;
}

const initialState: AdminAuthState = {
  admin: null,
  isAuthenticated: false,
};

const adminAuthSlice = createSlice({
  name: "_auth",
  initialState,
  reducers: {
    setAdmin: (state, action: PayloadAction<Admin>) => {
      state.admin = action.payload;
      state.isAuthenticated = true;
    },
    clearAdmin: (state) => {
      state.admin = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setAdmin, clearAdmin } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;