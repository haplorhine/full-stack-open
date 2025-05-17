import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const personsList = persons.map((person) => <div key={person.name}>{person.name}</div>)

  const addName = (ev) => {
    ev.preventDefault()
    setPersons(persons.concat({ name: newName }))
    setNewName('')
  }

  const handleChange = (ev) => {
    console.log(ev.target.value)
    setNewName(ev.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      
      <form onSubmit={addName}>
        <div>
          name: <input onChange={handleChange} name="name" value={newName}/>
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
