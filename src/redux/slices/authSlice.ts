import { User } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface AuthState {
  user: User | null;
  signupData: {
    name: string;
    email: string;
    password: string;
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
