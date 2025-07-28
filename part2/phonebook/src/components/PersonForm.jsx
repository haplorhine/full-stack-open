const PersonForm = ({onSubmit, numberChange, nameChange, newName, newNumber}) => {


  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input onChange={nameChange} name="name" value={newName} />
      </div>
      <div>
        number: <input onChange={numberChange} name="name" value={newNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm
