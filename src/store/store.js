import { configureStore } from "@reduxjs/toolkit";
import studentsReducer from "../pages/alumnos/studentsSlice";

const store = configureStore({
  reducer: {
    students: studentsReducer,
  },
});

export default store;
