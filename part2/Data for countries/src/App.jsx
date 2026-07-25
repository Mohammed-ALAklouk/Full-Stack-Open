import { useState, useEffect } from 'react'
import axios from 'axios'

const apikey = import.meta.env.VITE_OPENWEATHER_API_KEY
const weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather'

const searchCountry = (countries, search) => {
  if (!search) {
    return []
  }
  return countries.filter(country =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  )
}

const getWeather = async (country) => {
  if (!country || !country.capital) {
    return null
  }
  const capital = country.capital[0]
  try {
    const response = await axios.get(`${weatherApiUrl}?q=${capital}&appid=${apikey}&units=metric`)
    return response.data
  } catch (error) {
    console.error('Error fetching weather data:', error)
    return null
  }
}


const Weather = ({ weather }) => {
  if (!weather) {
    return <p>Loading weather data...</p>
  }

  return (
    <div>
      <h3>Weather in {weather.name}</h3>
      <p>Temperature {weather.main.temp}°C</p>
      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="Weather icon" />
      <p>Wind {weather.wind.speed} m/s</p>
    </div>
  )
}

const Country = ({ country, weather }) => {
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
      <Weather weather={weather} />
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
  const [weather, setWeather] = useState(null)

  const matchingCountries = searchCountry(countries, search)
  const shownCountry = selectedCountry ? selectedCountry : (matchingCountries.length === 1 ? matchingCountries[0] : null)

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  useEffect(() => {
    if (!shownCountry) {
      setWeather(null)
      return
    } 
    
    getWeather(shownCountry).then(data => setWeather(data))
  }, [shownCountry])

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
        shownCountry ? (
          <Country country={shownCountry} weather={weather} />
        ) : (
          <CountryList countries={matchingCountries} onCountryClick={handleCountryClick} />
        )
      }
    </>
  )
}

export default App
