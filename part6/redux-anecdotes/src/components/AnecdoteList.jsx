import { useSelector, useDispatch } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import {
  removeNotification,
  setNotification,
} from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    return anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase()),
    )
  })

  const dispatch = useDispatch()

  const vote = ({ content, id }) => {
    console.log('vote', id)
    dispatch(voteFor(id))

    dispatch(setNotification(`You voted for '${content}'`))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

  const sortedAnecdotes = () => {
    const sorted = [...anecdotes].sort((a, b) => b.votes - a.votes)
    return sorted.map((anecdote) => (
      <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </div>
    ))
  }

  return sortedAnecdotes()
}

export default AnecdoteList
