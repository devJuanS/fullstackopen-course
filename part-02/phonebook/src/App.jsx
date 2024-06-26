import { useState } from 'react';

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' },
  ]);
  const [newName, setNewName] = useState('');

  const addName = ( event ) => {
    event.preventDefault();
    
    const existNameInPersons = persons.some( person => person.name === newName.trim() );

    if ( existNameInPersons ) {
      alert(`${ newName } is already added to phonebook`);
      setNewName('');
      return;
    }

    const personObject = {
      name: newName,
    };

    setPersons( persons.concat( personObject ) );
    setNewName('');
  }

  const handleNameChange = ( event ) => setNewName( event.target.value );

  return (
    <>
      <div>
        <h2>Phonebook</h2>
        <form onSubmit={ addName }>
          <div>
            Name: 
            <input 
              value    = { newName } 
              onChange = { handleNameChange }
            />
          </div>
          <div>
            <button type='submit'>Add</button>
          </div>
        </form>
        <h2>Numbers</h2>
        {
          persons.map( person => 
            <p key = {person.name}>{ person.name }</p>
          )
        }
      </div>
    </>
  );
}

export default App;
