import { combineReducers } from '@reduxjs/toolkit'
import userConnectedSlice from '../features/userConnected'

export const rootReducer = combineReducers({
  user: userConnectedSlice,
})
