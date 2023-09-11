import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const Introduction = ({text}) => (
  <h1>{text}</h1>
)

const StatisticLine = ({text, value, mark}) => {
  return (
    <>
      <tr>
        <td>{text}</td>
        <td>{value} {mark}</td>
      </tr>
    </>
  )
}

const Statistics = ({good, neutral, bad, all}) => {
  if (all === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text='Good' value={good} />
          <StatisticLine text='Neutral' value={neutral} />
          <StatisticLine text='Bad' value={bad} />
          <StatisticLine text='All' value={all} />
          <StatisticLine text='Average' value={(good - bad)/all} />
          <StatisticLine text='Positive' value={good/all * 100} mark='%'/>
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleGood = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    setAll(updatedGood + neutral + bad)
  }

  const handleNeutral = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    setAll(good + updatedNeutral + bad)
  }

  const handleBad = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    setAll(good + neutral + updatedBad)
  }

  return (
    <div>
      <Introduction text='Introduction'/>
      <Button handleClick={handleGood} text='good'/>
      <Button handleClick={handleNeutral} text='neutral'/>
      <Button handleClick={handleBad} text='bad'/>
      <Introduction text='Statistics' />
      <Statistics good={good} neutral={neutral} bad={bad} all={all}/>
    </div>
  )
}

export default App
