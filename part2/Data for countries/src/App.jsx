import { useState, useEffect } from 'react'
import axios from 'axios'

const searchCountry = (countries, search) => {
  if (!search) {
    return []
  }
  return countries.filter(country =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  )
}

const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      {/* We display 'N/A' if the capital is not available and join the array to accommodate countries with multiple capitals */}
      <p>Capital: {country.capital ? country.capital.join(", ") : 'N/A'}</p>
      <p>Area: {country.area}</p>

      {/* Display languages if available */}
      {
        country.languages ? (
          <>
            <h3>Languages:</h3>
            <ul>
            {
              Object.values(country.languages).map(language => (
                <li key={language}>{language}</li>
              ))
            }
            </ul>
          </>
        ) 
        : <p>No languages available</p>
      }
      
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
    </div>
  )
}

const CountryRow = ({ country, onCountryClick }) => {
  return (
    <div>
      <span>{country.name.common}</span>
      <button onClick={() => onCountryClick(country)}>Show</button>
    </div>
  )
}

const CountryList = ({ countries, onCountryClick }) => {
  if (countries.length === 1) {
    return <Country country={countries[0]} />
  }
  
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  return (
    <>
      {countries.map(country => (<CountryRow key={country.name.common} country={country} onCountryClick={onCountryClick} />))}
    </>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])


  const handleInputChange = (event) => {
    setSearch(event.target.value)
    setSelectedCountry(null) // Reset selected country when search changes
  }

  const handleCountryClick = (country) => setSelectedCountry(country)

  return (
    <>
      <h1>Countries</h1>
      <input
        type="text"
        value={search}
        onChange={handleInputChange}
        placeholder="Search for a country"
        />


      {
        selectedCountry ? (
          <Country country={selectedCountry} />
        ) : (
          <CountryList countries={searchCountry(countries, search)} onCountryClick={handleCountryClick} />
        )
      }
    </>
  )
}

export default App
