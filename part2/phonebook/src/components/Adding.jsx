const Adding = ({ addPerson, newName, handleAddChange, newNumber, handleAddNumChange }) => {
  return (
    <div>
        <h2>Add a new user</h2>
        <form onSubmit={addPerson}>
            <div>
            	Name: <input required value={newName} onChange={handleAddChange}/>
            </div>
            <div>
            	Number: <input required value={newNumber} onChange={handleAddNumChange} />
            </div>
            <div>
            	<button type="submit">add</button>
            </div>
        </form>
    </div>
  )
}

export default Adding