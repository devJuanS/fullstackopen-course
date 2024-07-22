import { useState } from 'react';

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
  ]);
  const [newName, setNewName]     = useState(''),
        [newNumber, setNewNumber] = useState('');

  const addPerson = ( event ) => {
    event.preventDefault();
    
    if ( !newName || !newNumber ) {
      alert('Both field are required');
      setNewName('');
      setNewNumber('');
      return;
    }
    const existNameInPersons = persons.some( person => person.name === newName.trim() );

    if ( existNameInPersons ) {
      alert(`${ newName } is already added to phonebook`);
      setNewName('');
      setNewNumber('');
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
    };

    setPersons( persons.concat( personObject ) );
    setNewName('');
    setNewNumber('');
  }

  /**
   * Event handler to synchronizes the changes made to the input with the component's state
   * @param {HTMLInputElement} event
   */
  const handleNameChange   = ( event ) => setNewName( event.target.value );
  
  /**
   * Event handler to synchronizes the changes made to the input with the component's state
   * @param {HTMLInputElement} event
   */
  const handleNumberChange = ( event ) => setNewNumber( event.target.value );

  return (
    <>
      <div>
        <h2>Phonebook</h2>
        <form onSubmit={ addPerson }>
          <div>
            Name: 
            <input 
              value    = { newName } 
              onChange = { handleNameChange }
            />
          </div>
          <div>
            Phone number: 
            <input 
              type     = "text"
              value    = { newNumber }
              onChange = { handleNumberChange } 
            />
          </div>
          <div>
            <button type='submit'>Add</button>
          </div>
        </form>
        <h2>Numbers</h2>
        {
          persons.map( person => 
            <div key = {person.name}>{ person.name } - { person.number }</div>
          )
        }
      </div>
    </>
  );
}

export default App;
