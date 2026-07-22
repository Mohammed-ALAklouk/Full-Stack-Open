import { useState } from 'react'
const Button = (props) => <button onClick={props.handleClick}>{props.text}</button>

const StatisticsLine = (props) =>{
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
} 

const Statistics = (props) => {
  let good = props.good
  let neutral = props.neutral
  let bad = props.bad
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </>
    )
  }

  return (
    <>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticsLine text="good" value={good} />
          <StatisticsLine text="neutral" value={neutral} />
          <StatisticsLine text="bad" value={bad} />
          <StatisticsLine text="all" value={good + neutral + bad} />
          <StatisticsLine text="average" value={(good - bad) / (good + neutral + bad)} />
          <StatisticsLine text="positive" value={good / (good + neutral + bad) * 100 + " %"} />
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  const [goodCount, setGoodCount] = useState(0)
  const [neutralCount, setNeutralCount] = useState(0)
  const [badCount, setBadCount] = useState(0)
  
  
  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={() => setGoodCount(goodCount + 1)} text="good" />
      <Button handleClick={() => setNeutralCount(neutralCount + 1)} text="neutral" />
      <Button handleClick={() => setBadCount(badCount + 1)} text="bad" />

      <Statistics good={goodCount} neutral={neutralCount} bad={badCount} />
      
    </div>
  )
}

export default App
