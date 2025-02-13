import { useState } from 'react'



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

  const calculateAverage = () => {
    const score = good - bad
    return score / allClicks || 0
  }

  const calculatePositivePercentage = () => {
    
    return (good / allClicks) * 100 || 0
  }

  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={increaseGood}>good</button>
      <button onClick={increaseNeutral}>neutral</button>
      <button onClick={increaseBad}>bad</button>
      
      <h2>statistics</h2>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
      <div>all {allClicks}</div>
      <div>average {calculateAverage()}</div>
      <div>positive {calculatePositivePercentage()}%</div>
      
    </div>
  )
}

export default App
