import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
const CONVERSATION_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/conversation`;
const MESSAGE_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/message`;

const initialState = {
status: "",
error: "",
conversations: [],
activeConversation:{},
messages: [],
notifications: [],
}

//funtions
export const getConversations = createAsyncThunk(
    "conversation/all",async(token, {rejectWithValue}) => {
        try {
            const {data} = await axios.get(CONVERSATION_ENDPOINT, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            return data
        } catch (error) {
            // console.log(error)
            return rejectWithValue(error.reponse.data.error.message)
        }
    }
)
//funtions
export const open_create_Conversation = createAsyncThunk(
    "conversation/open_create",
    async(values, {rejectWithValue}) => {
        const {token, reciever_id} = values;
        try {
            const {data} = await axios.post(CONVERSATION_ENDPOINT, 
                {reciever_id},
                {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            return data
        } catch (error) {
            // console.log(error)
            return rejectWithValue(error.reponse.data.error.message)
        }
    }
)
//funtions
export const getConversationMessages = createAsyncThunk(
    "conversation/messages",
    async(values, {rejectWithValue}) => {
        const {token, convo_id} = values;
        try {
            const {data} = await axios.get(`${MESSAGE_ENDPOINT}/${convo_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            return data
        } catch (error) {
            // console.log(error)
            return rejectWithValue(error.reponse.data.error.message)
        }
    }
)

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveConversation: (state, action) => {
        state.activeConversation = action.payload;
    }
  },
  extraReducers(builder){
    builder.addCase(getConversations.pending,(state, action)=> {
        state.status = 'loading';
    })
    .addCase(getConversations.fulfilled,(state, action)=> {
        state.status = 'succeeded';
        state.conversations = action.payload;
    })
    .addCase(getConversations.rejected,(state, action)=> {
        state.status = 'failed';
        state.error = action.payload;
    })
    .addCase(open_create_Conversation.pending,(state, action)=> {
        state.status = 'loading';
    })
    .addCase(open_create_Conversation.fulfilled,(state, action)=> {
        state.status = 'succeeded';
        state.activeConversation = action.payload;
    })
    .addCase(open_create_Conversation.rejected,(state, action)=> {
        state.status = 'failed';
        state.error = action.payload;
    })
    .addCase(getConversationMessages.pending,(state, action)=> {
        state.status = 'loading';
    })
    .addCase(getConversationMessages.fulfilled,(state, action)=> {
        state.status = 'succeeded';
        state.messages = action.payload;
    })
    .addCase(getConversationMessages.rejected,(state, action)=> {
        state.status = 'failed';
        state.error = action.payload;
    })
  }
});

export const { setActiveConversation} = chatSlice.actions

export default chatSlice.reducer