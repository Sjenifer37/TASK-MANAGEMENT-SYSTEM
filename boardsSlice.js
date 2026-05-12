import { createSlice } from "@reduxjs/toolkit";
import data from "../data.json";

const boardsSlice = createSlice({
  name: "boards",
  initialState: data.boards,
  reducers: {
    addBoard: (state, action) => {
      const isActive = state.length === 0; // first board auto active
      const { name, newColumns } = action.payload;

      const newBoard = {
        name,
        isActive,
        columns: newColumns,
      };

      // deactivate all existing boards if new one becomes active
      if (isActive) {
        state.forEach((board) => (board.isActive = false));
        newBoard.isActive = true;
      }

      state.push(newBoard);
    },

    editBoard: (state, action) => {
      const { name, newColumns } = action.payload;
      const activeBoard = state.find((b) => b.isActive);
      if (activeBoard) {
        activeBoard.name = name;
        activeBoard.columns = newColumns;
      }
    },

    deleteBoard: (state) => {
      const activeIndex = state.findIndex((b) => b.isActive);
      if (activeIndex !== -1) {
        state.splice(activeIndex, 1);

        // Auto-select another board after delete
        if (state.length > 0) {
          state[0].isActive = true;
        }
      }
    },

    // ⭐ FIXED — ensures React re-renders correctly
    setBoardActive: (state, action) => {
      const { index } = action.payload;
      return state.map((board, i) => ({
        ...board,
        isActive: i === index ? true : false,
      }));
    },

    addTask: (state, action) => {
      const { title, status, description, subtasks, newColIndex } = action.payload;
      const board = state.find((b) => b.isActive);
      const task = { title, description, subtasks, status };
      board.columns[newColIndex].tasks.push(task);
    },

    editTask: (state, action) => {
      const { title, status, description, subtasks, prevColIndex, newColIndex, taskIndex } = action.payload;
      const board = state.find((b) => b.isActive);

      const prevCol = board.columns[prevColIndex];
      const task = prevCol.tasks[taskIndex];
      
      task.title = title;
      task.status = status;
      task.description = description;
      task.subtasks = subtasks;

      if (prevColIndex !== newColIndex) {
        prevCol.tasks.splice(taskIndex, 1);
        board.columns[newColIndex].tasks.push(task);
      }
    },

    dragTask: (state, action) => {
      const { colIndex, prevColIndex, taskIndex } = action.payload;
      const board = state.find((b) => b.isActive);
      const task = board.columns[prevColIndex].tasks.splice(taskIndex, 1)[0];
      board.columns[colIndex].tasks.push(task);
    },

    setSubtaskCompleted: (state, action) => {
      const { colIndex, taskIndex, index } = action.payload;
      const board = state.find((b) => b.isActive);
      const subtask = board.columns[colIndex].tasks[taskIndex].subtasks[index];
      subtask.isCompleted = !subtask.isCompleted;
    },

    setTaskStatus: (state, action) => {
      const { colIndex, newColIndex, taskIndex, status } = action.payload;
      const board = state.find((b) => b.isActive);

      if (colIndex === newColIndex) return;

      const task = board.columns[colIndex].tasks.splice(taskIndex, 1)[0];
      task.status = status;
      board.columns[newColIndex].tasks.push(task);
    },

    deleteTask: (state, action) => {
      const { colIndex, taskIndex } = action.payload;
      const board = state.find((b) => b.isActive);
      board.columns[colIndex].tasks.splice(taskIndex, 1);
    },
  },
});

export default boardsSlice;
