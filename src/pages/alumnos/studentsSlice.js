// src/features/students/studentsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  selectedStudent: null,
  search: "",
  searchId: "",
};

const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    setStudents(state, action) {
      state.list = action.payload;
    },

    selectStudent(state, action) {
      state.selectedStudent = action.payload;
    },

    updateStudent(state, action) {
      const updatedStudent = action.payload;
      state.list = state.list.map((student) =>
        student.id === updatedStudent.id ? updatedStudent : student
      );
      if (
        state.selectedStudent &&
        state.selectedStudent.id === updatedStudent.id
      ) {
        state.selectedStudent = updatedStudent;
      }
    },

    deleteStudent(state, action) {
      const studentId = action.payload;
      state.list = state.list.filter((student) => student.id !== studentId);
      if (state.selectedStudent && state.selectedStudent.id === studentId) {
        state.selectedStudent = null;
      }
    },

    setSearchCriteria(state, action) {
      state.search = action.payload.search;
      state.searchId = action.payload.searchId;
    },
  },
});

export const {
  setStudents,
  selectStudent,
  updateStudent,
  deleteStudent,
  setSearchCriteria,
} = studentsSlice.actions;
export default studentsSlice.reducer;
