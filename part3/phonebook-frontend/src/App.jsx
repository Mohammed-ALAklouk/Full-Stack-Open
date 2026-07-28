import { useState, useEffect } from 'react'
import personService from './services/persons'
import './App.css'

const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }

  const notificationClass = notification.type === 'error'
    ? 'notification error'
    : 'notification'

  return (
    <div className={notificationClass}>
      {notification.message}
    </div>
  )
}

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      filter shown with <input value={filter} onChange={handleFilterChange} placeholder="Jhon doe" />
    </div>
  )
}

const PersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Person = ({ person, deletePerson }) => {
  return (
    <li>{person.name} - {person.number} <button onClick={() => deletePerson(person.id)}>delete</button></li>
  )
}

const Numbers = ({ personsToShow, deletePerson }) => {
  return (
    <>
      <ul>
        {personsToShow.map(person => <Person key={person.id} person={person} deletePerson={deletePerson} />)}
      </ul>
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

  const notify = (message, type = 'success') => {
    setNotification({ message, type, id: Date.now() })
  }

  const hook = () => {
    personService.getAll()
      .then(data => {
        setPersons(data)
      })
      .catch(() => {
        notify('Could not load the phonebook from the server', 'error')
      })
  }

  useEffect(hook, [])

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [notification])

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    const existing = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())

    if (existing) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService.update(existing.id, personObject)
          .then(data => {
            setPersons(persons.map(person => person.id === existing.id ? data : person))
            notify(`Updated ${personObject.name}`)
            setNewName('')
            setNewNumber('')
          })
          .catch(() => {
            notify(`Information of ${personObject.name} has already been removed from server`, 'error')
            setPersons(persons.filter(person => person.id !== existing.id))
          })
      }

      return
    }

    personService.create(personObject)
      .then(data => {
        setPersons(persons.concat(data))
        setNewName('')
        setNewNumber('')
        notify(`Added ${personObject.name}`)
      })
      .catch(() => {
        notify(`Could not add ${personObject.name}`, 'error')
      })
  }

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.deletePerson(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          notify(`Deleted ${person.name}`)
        })
        .catch(() => {
          notify(`Information of ${person.name} has already been removed from server`, 'error')
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  const personsToShow = filter === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter filter={filter} handleFilterChange={(event) => setFilter(event.target.value)} />
      <h3>Add a new</h3>
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        handleNameChange={(event) => setNewName(event.target.value)}
        newNumber={newNumber}
        handleNumberChange={(event) => setNewNumber(event.target.value)}
      />

      <h3>Numbers</h3>
      <Numbers personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App