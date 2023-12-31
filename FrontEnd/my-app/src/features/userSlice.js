import {createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const AUTH_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/auth`

const initialState = {
    status: "",
    error: "",
    user: {
        id: "",
        name: "",
        email: "",
        picture: "",
        status: "",
        token: "",
    }
}

//Funtion that goes to the backend
export const registerUser = createAsyncThunk("auth/register", async(values,{rejectWithValue})=>{
  try {
    const {data} = await axios.post(`${AUTH_ENDPOINT}/register`,{...values});
    return data;
  } catch (error) {
    // console.log(error)
    return rejectWithValue(error.response.data.error.message);
  }
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
        state.status = "";
        state.error = "";
        state.user = {
            id: "",
            name: "",
            email: "",
            picture: "",
            status: "",
            token: ""
        }
    }
  },
  //sending the user data to the redux store with using dispach action
  extraReducers(builder){
    builder.addCase(registerUser.pending,(state,action)=>{
      state.status = "loading";
    })
    .addCase(registerUser.fulfilled,(state, action)=> {
      state.status = "succeeded";
      state.user= action.payload.user
    })
    .addCase(registerUser.rejected,(state, action)=>{
      state.status = "failed";
      state.error= action.payload;
    })
  }
});

export const {logout} = userSlice.actions

export default userSlice.reducer