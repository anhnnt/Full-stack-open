const CountryInfo = ({ filteredCountries }) => {
  return (
    <div>
        <h1>{filteredCountries.name.common}</h1>
        <p>Capital {filteredCountries.capital}</p>
        <p>Area {filteredCountries.area}</p>
        <h3>Languages: </h3>
        <ul>
            {Object.values(filteredCountries.languages).map((val, k) =><li key={k}>{val}</li>)
            }
        </ul>
        <img src={filteredCountries.flags.png} alt={filteredCountries.name.common} width="200"/>
        <h2>Weather in {filteredCountries.capital}</h2>
        <p>Temperature Celcius</p>
        <img />
        <p>Wind m/s</p>
    </div>
  )
}

export default CountryInfo