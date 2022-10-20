// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import member from 'src/store/apps/member'
import event from 'src/store/apps/event'


export const store = configureStore({
  reducer: {
    member,
    event
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})