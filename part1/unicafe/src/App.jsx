import { useState } from 'react'

const Statistics = ({all, good, neutral, bad}) => {
  const calculateAverage = () => (good - bad) / all || 0

  const calculatePositivePercentage = () => (good / all) * 100 || 0

  return (
    <>
      <h2>statistics</h2>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
      <div>all {all}</div>
      <div>average {calculateAverage()}</div>
      <div>positive {calculatePositivePercentage()}%</div>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setClicks] = useState(0)

  const increaseGood = () => {
    setGood(good + 1)
    setClicks(allClicks + 1)
  }

  const increaseNeutral = () => {
    setNeutral(neutral + 1)
    setClicks(allClicks + 1)
  }

  const increaseBad = () => {
    setBad(bad + 1)
    setClicks(allClicks + 1)
  }

  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={increaseGood}>good</button>
      <button onClick={increaseNeutral}>neutral</button>
      <button onClick={increaseBad}>bad</button>
      
      <Statistics good={good} neutral={neutral} bad={bad} all={allClicks}/>
      
    </div>
  )
}

export default App
