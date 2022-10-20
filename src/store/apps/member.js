import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// ** Fetch Users
export const fetchData = createAsyncThunk('appMembers/fetchData', async params => {
  const response = await axios.get('http://fineapwl.backend/api/members/get_members', {
    params
  })

  return response.data
  
})

export const appMembersSlice = createSlice({
    name: 'appMembers',
    initialState: {
      data: [],
      total: 1,
      params: {},
      allData: []
    },
    reducers: {},
    extraReducers: builder => {
      builder.addCase(fetchData.fulfilled, (state, action) => {
        state.data = action.payload.members
        state.total = action.payload.total
        state.params = action.payload.params
        state.allData = action.payload.allData
      })
    }
  })
  
  export default appMembersSlice.reducer