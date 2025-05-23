import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' }
  ])
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  const personsList = filteredPersons.map((person) => <div key={person.name}>{person.name} {person.number}</div>)

  const addPerson = (ev) => {
    ev.preventDefault()
    const nameInPhonebook = persons.some(person => person.name === newName)
    if (nameInPhonebook) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }))
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      
      <div>
        filter shown with <input onChange={ev => setFilter(ev.target.value)} type="text" />
      </div>

      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={ev => setNewName(ev.target.value)} name="name" value={newName}/>
        </div>
        <div>
          number: <input onChange={ev => setNewNumber(ev.target.value)} name="name" value={newNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsList}
    </div>
  )
}

export default App
