import { useState } from 'react'

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Anecdote = ({anecdote, votes, heading}) => {
      return (
        <>
          <h2>{heading}</h2>
          <div>
            {anecdote}
          </div>
          <div>
            has {votes} votes
          </div>
        </>
      )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  
  const mostVoted = votes.indexOf(Math.max(...votes))
  console.log(mostVoted)

  const vote = () => {
    const votesCopy = [...votes]
    votesCopy[selected]++
    setVotes(votesCopy)
  }

  const setRandomQuote = () => {
    const randomQuoteIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomQuoteIndex)
  }

  
  
   
  

  return (
    <>
      
      <Anecdote
        anecdote={anecdotes[selected]}
        votes={votes[selected]}
        heading="Anecdote of the day"
      />

      <Button onClick={vote} text="vote" />
      <Button onClick={setRandomQuote} text="next anecdote" />

      <Anecdote 
        anecdote={anecdotes[mostVoted]}
        votes={votes[mostVoted]}
        heading="Anecdote with most votes"
      />
      
    </>
  )
}

export default App
