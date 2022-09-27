import { createSlice } from "@reduxjs/toolkit";
import { InitialState } from "../interface";

const initialState: InitialState = {
    todos: []
}

export const TodoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        initialize: (state, action) => {
            state.todos = action.payload
        },
        updater: (state, action) => {
            state.todos = [...state.todos, action.payload]
        },
        deleter: (state, action) => {
            state.todos = state.todos.filter((item) => item._id !== action.payload)
        }
    }
})

export const { initialize, updater, deleter } = TodoSlice.actions
export default TodoSlice.reducer