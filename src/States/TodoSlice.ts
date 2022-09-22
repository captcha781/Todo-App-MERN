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
        }
    }
})

export const { initialize } = TodoSlice.actions
export default TodoSlice.reducer