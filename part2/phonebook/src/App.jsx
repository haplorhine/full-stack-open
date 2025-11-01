import { useState, useEffect } from 'react'
import personService from './services/persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    console.log('effect')
    personService.getAll().then((initialPersons) => {
      console.log('promise fulfilled')
      setPersons(initialPersons)
    })
  }, [])
  console.log('persons length', persons.length)

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  const createMessage = (type, text) => {
    return { type: type, text: text }
  }

  const removeMessage = (millis) => {
    setTimeout(() => {
      setMessage(null)
    }, millis)
  }

  const addPerson = (ev) => {
    ev.preventDefault()
    console.log(ev)
    const existingPerson = persons.find((person) => person.name === newName)
    if (existingPerson === undefined) {
      personService
        .create({ name: newName, number: newNumber })
        .then((returnedPerson) => {
          console.log('app returnedperson:', returnedPerson)
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setMessage(
            createMessage('notification', `Added ${returnedPerson.name}`)
          )
          removeMessage(5000)
        })
    } else if (
      confirm(
        `${newName} is already added to the phonebook, replace old number with new one?`
      )
    ) {
      const changedPerson = { ...existingPerson, number: newNumber }
      personService
        .update(existingPerson.id, changedPerson)
        .then(() => {
          personService.getAll().then((returnedPersons) => {
            setPersons(returnedPersons)
            setMessage(
              createMessage('notification', `Updated ${existingPerson.name}`)
            )
            removeMessage(5000)
          })
        })
        .catch(() => {
          setMessage(
            createMessage(
              'error',
              `Information of '${existingPerson.name}' was already deleted from the server`
            )
          )
          removeMessage(5000)
          setPersons(persons.filter((p) => p.id !== existingPerson.id))
        })
    }
  }

  const deletePerson = (personToDelete) => {
    console.log(`${personToDelete.name} needs to be deleted`)
    if (confirm(`Delete ${personToDelete.name}?`)) {
      personService.remove(personToDelete.id).then(() => {
        setPersons(persons.filter((person) => person.id !== personToDelete.id))
      })
    }
  }

  const nameChange = (ev) => setNewName(ev.target.value)
  const numberChange = (ev) => setNewNumber(ev.target.value)
  const filterChange = (ev) => setFilter(ev.target.value)

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} />

      <Filter onChange={filterChange} />

      <h3>add a new</h3>

      <PersonForm
        onSubmit={addPerson}
        numberChange={numberChange}
        nameChange={nameChange}
        newName={newName}
        newNumber={newNumber}
      />

      <h3>Numbers</h3>

      <Persons persons={filteredPersons} deletePerson={deletePerson} />
    </div>
  )
}

export default App
