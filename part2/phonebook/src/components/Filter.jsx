const Filter = ({filter, handleFilterChange}) => {
  return (
    <div>
        <h2>Phonebook</h2>
        <div>
            Filter shown with <input value={filter} onChange={handleFilterChange}/>
        </div>
    </div>
  )
}

export default Filter