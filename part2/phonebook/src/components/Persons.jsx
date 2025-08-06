const Person = ({ person, onClick }) => {
  
  return (
    <div>{person.name} {person.number} <button onClick={onClick}>delete</button></div>
  )
}

const Persons = ({ persons, deletePerson }) => {

  return (
    <div>
      {persons.map((person) => <Person person={person} key={person.id} onClick={() => deletePerson(person)}/>) }
    </div>
  )
}

export default Persons
