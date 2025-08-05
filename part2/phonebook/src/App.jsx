import { useState, useEffect } from 'react'
import personService from './services/persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')


  useEffect(() => {
    console.log("effect")
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }, [])
  console.log("persons length", persons.length)

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))


  const addPerson = (ev) => {
    ev.preventDefault()
    console.log(ev)
    const nameInPhonebook = persons.some(person => person.name === newName)
    if (nameInPhonebook) {
      alert(`${newName} is already added to phonebook`)
    } else {
      personService
        .create({ name: newName, number: newNumber })
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }

  }

  const nameChange = ev => setNewName(ev.target.value)
  const numberChange = ev => setNewNumber(ev.target.value)
  const filterChange = ev => setFilter(ev.target.value)



  return (
    <div>
      <h2>Phonebook</h2>

      <Filter onChange={filterChange} />

      <h3>add a new</h3>

      <PersonForm onSubmit={addPerson} numberChange={numberChange} nameChange={nameChange} newName={newName} newNumber={newNumber} />

      <h3>Numbers</h3>

      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App
