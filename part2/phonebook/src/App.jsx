import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Adding from './components/Adding'
import People from './components/People'
import personService from './services/person'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [persons, setPerson] = useState([])
  const [newName, setNewName] = useState('Harry Potter')
  const [newNumber, setNewNumber] = useState('040-1234566')
  const [filter, setFilter] = useState('')
  const [systemMessage, setSystemMessage] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPerson(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const addedPerson = persons.find(p => p.name === newName)
    console.log('if exist person', addedPerson)

    if (addedPerson) {
      if (window.confirm(`${addedPerson.name} is is already added to phonebook, replace the old number with a new one?`)) {
        handleUpdateNumber(addedPerson)
      }
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber,
      }
      
      personService
        .adding(personObject)
        .then(returnedPerson => {
          setPerson(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setSystemMessage(`Added ${returnedPerson.name}`)
          setTimeout(() => {
            setSystemMessage(null)
          }, 3000)
        })
    }
  }

  const handleUpdateNumber = addedPerson => {
    const changedPerson = { ...addedPerson, number: newNumber }
    console.log('changedPerson', changedPerson)

    personService
      .update(addedPerson.id, changedPerson)
      .then(returnedPerson => {
        setPerson(persons.map(p => p.id !== addedPerson.id ? p : returnedPerson))
        setNewName('')
        setNewNumber('')
        setSystemMessage(`Changed ${returnedPerson.name} number`)
        setTimeout(() => {
          setSystemMessage(null)
        }, 3000)
    })
      .catch(error => {
        setSystemMessage(`Error: Information of ${changedPerson.name} has already been removed from server`)
        setTimeout(() => {
          setSystemMessage(null)
        }, 4000)
      })
  }

  const handleAddChange = (event) => {
    setNewName(event.target.value)
  }

  const handleAddNumChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const addressToShow = persons.filter(person => 
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <Notification message={systemMessage}/>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <Adding addPerson={addPerson} newName={newName} newNumber={newNumber}
              handleAddChange={handleAddChange} handleAddNumChange={handleAddNumChange}/>
      <People 
        addressToShow={addressToShow} setPerson={setPerson}/>
    </div>
  )
}
export default App
