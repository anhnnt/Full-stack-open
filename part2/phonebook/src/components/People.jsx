import Person from "./Person"
import personService from '../services/person'

const People = ({ addressToShow, setPerson }) => {
  const deleteContactOf = (id) => {
    const person = addressToShow.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}?`))
    {
      console.log('delete contact of ' + id)
      personService
        .deleteContact(person.id)
        .then(() => {
          setPerson(addressToShow.filter(person => person.id !== id))
        })
    }
  }

  return (
    <div>
        <h2>Numbers</h2>
        <div>
            {
            addressToShow.map(person =>
                <Person key={person.id} person={person}
                  deleteContact={() => deleteContactOf(person.id)}/>
            )
            }
        </div>
    </div>
  )
}

export default People