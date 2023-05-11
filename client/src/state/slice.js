import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  nutritions: null,
  muscles: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userData(state, action) {
      state.user = action.payload;
    },
    userLogout(state) {
      state.user = null;
    },
    userNutritions(state, action) {
      state.nutritions = action.payload;
    },
    setMuscles(state, action) {
      state.muscles = action.payload;
    },
  },
});

export const { userData, userLogout, userNutritions, setMuscles } =
  authSlice.actions;
export default authSlice.reducer;
