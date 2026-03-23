import { createSlice, current } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    voteFor(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find((n) => n.id === id)
      console.log('anecdoteto change', current(anecdoteToChange))
      const votedForAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      }

      console.log(current(state))
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : votedForAnecdote,
      )
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

const { createAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const appendAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
  }
}

export const { voteFor } = anecdoteSlice.actions
export default anecdoteSlice.reducer
