import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type TodoItem = {
	id: number;
	name: string;
	status: 'none' | 'active' | 'complete';
};

export type State = {
	todos: TodoItem[];
};

const initialState: State = {
	todos: [],
};

export const todoSlice = createSlice({
	name: 'todo',
	initialState,
	reducers: {
		addTodo: (
			state,
			action: PayloadAction<{ name: string; completed: boolean }>
		) => {
			state.todos.push({
				id: state.todos.length + 1,
				name: action.payload.name,
				status: action.payload.completed ? 'complete' : 'none',
			});
		},
		removeTodo: (state, action: PayloadAction<number>) => {
			state.todos = state.todos.filter(
				(todo) => todo.id !== action.payload
			);
		},
		updateTodo: (state, action: PayloadAction<TodoItem>) => {
			const { id } = action.payload;
			const index = state.todos.findIndex((todo) => todo.id === id);
			if (index !== -1) {
				state.todos[index] = action.payload;
			}
		},
		updateTodoStatus: (
			state,
			action: PayloadAction<{
				id: number;
				status: 'none' | 'active' | 'complete';
			}>
		) => {
			const { id, status } = action.payload;
			const index = state.todos.findIndex((todo) => todo.id === id);
			if (index !== -1) {
				state.todos[index].status = status;
			}
		},
	},
});

// Action creators are generated for each case reducer function
export const { addTodo, removeTodo, updateTodo, updateTodoStatus } =
	todoSlice.actions;

export default todoSlice.reducer;
