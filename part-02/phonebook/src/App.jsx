import { useState, useEffect } from 'react';
import phonebookService from './services/phonebook';

/**
 * Filter component to show names according the entered value. 
 * @param {props} filterName Value to be filtered
 * @param {props} onChange   Handle function for the input control
 * @returns React component
 */
const Filter = ( {filterName, onChange} ) => {
  
  return (
    <>
      <div>
        Filter shown with 
        <input 
          type     = "text" 
          value    = { filterName }
          onChange = { onChange }
        />
      </div>
    </>
  );
}

/**
 * Form component to add a new phone number.
 * @param {*} props Value and handle function for the name and phone number controls.
 * @returns React component
 */
const PersonForm = ( props ) => {
  
  return (
    <>
      <form onSubmit = { props.onSubmit }>
        <div>
          Name: 
          <input 
            value    = { props.inputNameValue } 
            onChange = { props.onChangeName }
          />
        </div>
        <div>
          Phone number: 
          <input 
            type     = "text"
            value    = { props.inputNumberValue }
            onChange = { props.onChangeNumber } 
          />
        </div>
        <div>
          <button type='submit'>Add</button>
        </div>
      </form>
    </>
  );
}

/**
 * Component to render the phone number list.
 * @param {Array<Object>} personsList 
 * @returns React component
 */
const Persons = ( {personsList} ) => {
  return (
    <>
      {
        personsList.map( person => 
          <div key = {person.id}>{ person.name } - { person.number }</div>
        )
      }
    </>
  );
}

function App() {
  const [persons, setPersons]       = useState([]);
  const [newName, setNewName]       = useState(''),
        [newNumber, setNewNumber]   = useState(''),
        [filterName, setFilterName] = useState('');

  /**
   * Fetching data from db.json using the axios-library and completing it with a Effect hook
   */
  useEffect(() => {
    phonebookService
      .getAll()
      .then( initialData => setPersons( initialData) );
  }, []);
  
  /**
   * Add a person and his/her data entered on form control.
   * @param {HTMLFormControlsCollection} event 
   */
  const addPerson = ( event ) => {
    event.preventDefault();
    
    if ( !newName || !newNumber ) {
      alert('Both field are required');
      setNewName('');
      setNewNumber('');
      return;
    }

    /**
     * Validate if the name has already added.
     */
    const existNameInPersons = persons.some( person => person.name === newName.trim() );

    if ( existNameInPersons ) {
      alert(`${ newName } is already added to phonebook`);
      setNewName('');
      setNewNumber('');
      return;
    }

    const personObject = {
      id: persons.length + 1,
      name: newName,
      number: newNumber,
    };

    // saving new person in server
    phonebookService
      .create( personObject )
      .then( createdPerson => setPersons( persons.concat( createdPerson )));

    setNewName('');
    setNewNumber('');
  }

  /**
   * Store the filtered persons to show.
   */
  const personsToShow = !filterName 
    ? persons 
    : persons.filter( person => person.name.toLowerCase().includes(filterName.toLowerCase()) );

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
  
  /**
   * Event handler to synchronizes the changes made to the input with the component's state
   * @param {HTMLInputElement} event
   */
  const handleFilterChange = ( event ) => setFilterName( event.target.value );
  
  return (
    <>
      <div>
        <h2>Phonebook</h2>
        
        <Filter 
          filterName = { filterName }
          onChange = { handleFilterChange }
        />

        <h3>Add new person</h3>
        <PersonForm 
          onSubmit         = { addPerson }
          inputNameValue   = { newName } 
          onChangeName     = { handleNameChange }
          inputNumberValue = { newNumber }
          onChangeNumber   = { handleNumberChange }
        />

        <h3>Numbers</h3>
        <Persons personsList = { personsToShow } />
      </div>
    </>
  );
}

export default App;
