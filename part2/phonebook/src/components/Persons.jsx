const Person = ({ person }) => {
  
  return (
    <div>{person.name} {person.number}</div>
  )
}

const Persons = ({ persons }) => {

  return (
    <div>
      {persons.map((person) => <Person person={person} key={person.name} />) }
    </div>
  )
}

export default Persons
