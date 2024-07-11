import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

const initialState = {
  id: null,
  username: '',
}

const opennedConversationSlice = createSlice({
  name: 'opennedConversation',
  initialState: initialState,
  reducers: {
    setOpennedConversation: (state, action) => {
      state.id = action.payload.id
      state.username = action.payload.username
    },
  },
})

export const { setOpennedConversation } = opennedConversationSlice.actions
export default opennedConversationSlice.reducer

export const opennedConversationSelector = (state: RootState) =>
  state.opennedConversation
