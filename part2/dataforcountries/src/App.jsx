import { useEffect, useState } from 'react'
import ResultsDisplay from './components/ResultsDisplay'
import countryService from './services/country'

const App = () => {
  const [allCountries, setAllCountries] = useState([])
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    console.log('fetching all coutries...')

    countryService
      .getAll()
      .then(initialData => 
        setAllCountries(initialData))
  }, [])

  const handleChange = (event) => {
    setInputValue(event.target.value)
  }

  const handleCountries = (event) => {
    event.preventDefault()
    setInputValue(event.target.value)
  }

  return (
    <div>
      Find countries <input value={inputValue} onChange={handleChange}/>
      <ResultsDisplay allCountries={allCountries} handleCountries={handleCountries} inputValue={inputValue}/>
    </div>
  )
}

export default App
