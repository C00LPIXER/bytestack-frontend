import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  name: string;
  email: string;
  avatar: string;
}

interface AuthState {
  user: User | null;
  signupData: {
    name: string;
    email: string;
    password: string;
    otpShared: boolean;
  } | null;
}

const initialState: AuthState = {
  user: null,
  signupData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    clearUser() {
      return { ...initialState };
    },
    setSignupData(
      state,
      action: PayloadAction<{
        name: string;
        email: string;
        password: string;
        otpShared: boolean;
      }>
    ) {
      state.signupData = action.payload;
    },
    clearSignupData(state) {
      state.signupData = null;
    },
  },
});

export const { setUser, clearUser, setSignupData, clearSignupData } =
  authSlice.actions;
export default authSlice.reducer;
