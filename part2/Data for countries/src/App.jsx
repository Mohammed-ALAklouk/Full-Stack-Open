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

const Countrylist = ({ countries }) => {
  if (countries.length >= 10) {
    return <p>Too many matches, specify another filter</p>
  }

  if (countries.length === 1) {
    return (
      <div>
        <h2>{countries[0].name.common}</h2>
        <p>Capital: {countries[0].capital}</p>
        <p>Area: {countries[0].area}</p>
        <h3>Languages:</h3>
        <ul>
          {Object.values(countries[0].languages).map(language => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img src={countries[0].flags.png} alt={`Flag of ${countries[0].name.common}`} />
      </div>
    )

  }

  return (
    <>
      {countries.map(country => (
        <div key={country.name.common}>
          <span>{country.name.common}</span>
        </div>
      ))}
    </>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [selectedCountries, setSelectedCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  useEffect(() => {
    const filteredCountries = searchCountry(countries, search)
    setSelectedCountries(filteredCountries)
  }, [search])

  return (
    <>
      <h1>Countries</h1>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for a country"
        />

      <Countrylist countries={selectedCountries} />
    </>
  )
}

export default App
