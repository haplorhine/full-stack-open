import { useSelector, useDispatch } from 'react-redux'
import { voteFor } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'

const App = () => {
  const anecdotes = useSelector((state) => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteFor(id))
  }

  const sortedAnecdotes = () => {
    const sorted = [...anecdotes].sort((a, b) => b.votes - a.votes)
    return sorted.map((anecdote) => (
      <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
      </div>
    ))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {sortedAnecdotes()}
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  )
}

export default App
