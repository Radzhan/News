import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/stroe";

interface MessageInterface {
    messageArray: [];
}

const initialState: MessageInterface = {
    messageArray: [],
};

export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
    },
});

export const MessageReducer = messageSlice.reducer;
export const Message = (state: RootState) => state.message.messageArray;