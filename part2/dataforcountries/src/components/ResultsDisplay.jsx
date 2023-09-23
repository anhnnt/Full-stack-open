import CountryInfo from "./CountryInfo"

const ResultsDisplay = ({allCountries, handleCountries, inputValue}) => {
    const filteredCountries = allCountries.filter(country =>
        country.name.common.toLowerCase().includes(inputValue.toLowerCase()))
  
    if (filteredCountries.length === allCountries.length) return <div>Search by country name</div>
    else if (filteredCountries.length === 1) {
      return (    
      <div>
        <CountryInfo filteredCountries={filteredCountries[0]} />
      </div>)
    }
    else if (filteredCountries.length > 10) return <p>Too many matches, specify another filter</p>
  
    return (
      <div>
        {filteredCountries.map(country =>
          <div key={country.name.common}>
            {country.name.common}
            <button value={country.name.common} onClick={handleCountries}>Show</button>
          </div>)}
      </div>
    )
  }

export default ResultsDisplay