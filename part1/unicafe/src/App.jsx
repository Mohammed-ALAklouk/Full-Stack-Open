import { useState } from 'react'

function App() {
  const [goodCount, setGoodCount] = useState(0)
  const [neutralCount, setNeutralCount] = useState(0)
  const [badCount, setBadCount] = useState(0)
  
  return (
    <div>
      <h1>Give feedback</h1>
      <button onClick={() => setGoodCount(goodCount + 1)}>good</button>
      <button onClick={() => setNeutralCount(neutralCount + 1)}>neutral</button>
      <button onClick={() => setBadCount(badCount + 1)}>bad</button>

      <h1>Statistics</h1>
      <p>
        <span>good {goodCount}</span>
        <br></br>
        <span>neutral {neutralCount}</span>
        <br></br>
        <span>bad {badCount}</span>
      </p>
    </div>
  )
}

export default App
