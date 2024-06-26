import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Todo {
  id: number; // Assuming unique numeric ID for todos
  content: string;
  completed: boolean;
}

export interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: Todo = {
        id: Date.now(), // Generate a unique ID (consider better methods for production)
        content: action.payload,
        completed: false,
      };
      state.todos.push(newTodo);
      localStorage.setItem("todoData", JSON.stringify(state.todos));
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todoIndex = state.todos.findIndex(
        (todo) => todo.id === action.payload
      );
      if (todoIndex !== -1) {
        state.todos[todoIndex].completed = !state.todos[todoIndex].completed;
      }
      localStorage.setItem("todoData", JSON.stringify(state.todos));
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      localStorage.setItem("todoData", JSON.stringify(state.todos));
    },
    deleteAll: (state) => {
      state.todos = [];
      localStorage.setItem("todoData", JSON.stringify(state.todos));
    },
    setTodo: (state, action: PayloadAction<[]>) => {
      state.todos = action.payload;
      localStorage.setItem("todoData", JSON.stringify(state.todos));
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTodo, toggleTodo, deleteTodo, deleteAll, setTodo } =
  todoSlice.actions;

export default todoSlice.reducer;
