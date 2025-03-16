import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  signupData: {
    name: string;
    email: string;
    password: string;
  } | null;
}

const initialState: AuthState = {
  signupData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSignupData(
      state,
      action: PayloadAction<{ name: string; email: string; password: string }>
    ) {
      state.signupData = action.payload;
    },
    clearSignupData(state) {
      state.signupData = null;
    },
  },
});

export const { setSignupData, clearSignupData } = authSlice.actions;
export default authSlice.reducer;
