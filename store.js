import { configureStore } from "@reduxjs/toolkit";
import boardsSlice from "./boardsSlice";
import authReducer from "./authSlice";


const store = configureStore({
  reducer: {
    boards: boardsSlice.reducer,
      auth: authReducer,
  }
})

export default store