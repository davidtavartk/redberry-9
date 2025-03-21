// store/slices/taskFilterSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Filters = {
  departmentIds: number[];
  priorityIds: number[];
  employeeIds: number[];
};

const initialState: Filters = {
  departmentIds: [],
  priorityIds: [],
  employeeIds: [],
};

const taskFilterSlice = createSlice({
  name: "taskFilters",
  initialState,
  reducers: {
    setDepartments(state, action: PayloadAction<number[]>) {
      state.departmentIds = action.payload;
    },
    setPriorities(state, action: PayloadAction<number[]>) {
      state.priorityIds = action.payload;
    },
    setEmployees(state, action: PayloadAction<number[]>) {
      state.employeeIds = action.payload;
    },
    resetFilters(state) {
      state.departmentIds = [];
      state.priorityIds = [];
      state.employeeIds = [];
    },
  },
});

// ✅ All these match reducer names exactly
export const { setDepartments, setPriorities, setEmployees, resetFilters } = taskFilterSlice.actions;
export default taskFilterSlice.reducer;
