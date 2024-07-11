import { combineReducers } from '@reduxjs/toolkit'
import userConnectedSlice from '../features/userConnected'
import opennedConversationSlice from '../features/opennedConversation'

export const rootReducer = combineReducers({
  user: userConnectedSlice,
  opennedConversation: opennedConversationSlice,
})
