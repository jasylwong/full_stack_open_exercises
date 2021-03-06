import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';
import Button from './components/Button';
import Statistics from './components/Statistics';

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad
  const scores = {good, neutral, bad, all}

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Header content="give feedback" />
      <Button onClick={handleGoodClick} content="good" />
      <Button onClick={handleNeutralClick} content="neutral" />
      <Button onClick={handleBadClick} content="bad" />
      <Header content="statistics" />
      {all === 0 ? <p>No feedback given</p> : <Statistics scores={scores} />}
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
