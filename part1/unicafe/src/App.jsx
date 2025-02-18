import { useState } from 'react'

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const StatisticLine = ({text, value}) => (<div>{text} {value}</div>)

const Statistics = ({all, good, neutral, bad}) => {
  const calculateAverage = () => (good - bad) / all || 0
  
  const calculatePositivePercentage = () => (good / all) * 100 || 0

  const statistics =
    <>
      <StatisticLine text="good" value ={good} />
      <StatisticLine text="neutral" value ={neutral} />
      <StatisticLine text="bad" value ={bad} />
      <StatisticLine text="all" value ={all} />
      <StatisticLine text="average" value ={calculateAverage()} />
      <StatisticLine text="positive" value ={calculatePositivePercentage() + " %"} />
    </>

  const noFeedback = <p>No feedback given</p>

  return (
    <>
      <h2>statistics</h2>
      {all === 0 ? noFeedback : statistics}
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
      <Button onClick={increaseGood} text="good" />
      <Button onClick={increaseNeutral} text="neutral" />
      <Button onClick={increaseBad} text="bad" />
      
      <Statistics good={good} neutral={neutral} bad={bad} all={allClicks}/>
      
    </div>
  )
}

export default App
