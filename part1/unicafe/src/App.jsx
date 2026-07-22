import { useState } from 'react'

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
      <p>
        <span>good {good}</span>
        <br></br>
        <span>neutral {neutral}</span>
        <br></br>
        <span>bad {bad}</span>
        <br></br>
        <span>all {good + neutral + bad}</span>
        <br></br>
        <span>average {(good - bad) / (good + neutral + bad)}</span>
        <br></br>
        <span>positive {good / (good + neutral + bad) * 100} %</span>
      </p>
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
      <button onClick={() => setGoodCount(goodCount + 1)}>good</button>
      <button onClick={() => setNeutralCount(neutralCount + 1)}>neutral</button>
      <button onClick={() => setBadCount(badCount + 1)}>bad</button>

      <Statistics good={goodCount} neutral={neutralCount} bad={badCount} />
      
    </div>
  )
}

export default App
