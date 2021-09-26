import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  // new feature added

  return (
    <div>
      <h3>${count}</h3>
      <button onClick={() => setCount(count - 1)}>-</button>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  )
}

export default App
