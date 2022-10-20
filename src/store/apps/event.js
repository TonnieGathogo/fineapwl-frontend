import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
// ** Axios Imports
import axios from 'axios'


//** Fetch Events  */

export const fetchEvents=createAsyncThunk('events', async params=>{
    const response=await axios.get('http://fineapwl.backend/api/events/fetch', {
        params
      })
    return response.data   
})

const eventsSlice=createSlice({
  name:"events",
  initialState:{
  data:[],
  params:{}
  },
  reducers:{},
  extraReducers:builder=>{
    builder.addCase(fetchEvents.fulfilled,(state,action)=>{
      state.data = action.payload
      state.params=action.payload.params
    })
  }
})

export default eventsSlice.reducer

