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
const Persons = ( {personsList, deleteEntry} ) => {
  return (
    <>
      {
        personsList.map( person =>
          <div key = {person.id}>
            { person.name } - { person.number }
            <button key = {person.id} onClick={ () => deleteEntry(person.id, person.name) }>◀ delete</button>
          </div>
        )
      }
    </>
  );
}

/**
 * Component to render a notification message
 * @param {Boolean} isErrorMessage true if the notification is due to an error
 * @param {String} message 
 * @returns React component
 */
const Notification = ( { isErrorMessage, message } ) => {
  const notificationColor = isErrorMessage ? 'red' : 'green';
  const notificationStyle = {
    marginBottom: 12,
    padding: 8,
    color: notificationColor,
    fontSize: 20,
    backgroundColor: 'lightgrey',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: notificationColor,
    borderRadius: 8
  };

  if( message === null ) return null;

  return (
    <div style={ notificationStyle }>
      { message }
    </div>
  );
}

function App() {
  const [persons, setPersons]               = useState([]);
  const [newName, setNewName]               = useState('');
  const [newNumber, setNewNumber]           = useState('');
  const [filterName, setFilterName]         = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage]     = useState(null);

  const AXIOS_ERR_NETWORK_CODE = 'ERR_NETWORK';

  /**
   * Fetching data from db.json using the axios-library and completing it with a Effect hook
   */
  useEffect(() => {
    phonebookService
      .getAll()
      .then( initialData => setPersons( initialData) )
      .catch( error => {
        if( error.code === AXIOS_ERR_NETWORK_CODE ) {
          setNotificationMessageToShow(true, 'Unsuccessful connection with server.');
        }
      });
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
      const confirmReplaceNumber = window.confirm(`${ newName } is already added to phonebook. Do you want to replace the old number with a new one?`);
      if( confirmReplaceNumber ) {
        const personToUpdate = persons.find( person => person.name === newName.trim() );
        updatePerson({ ...personToUpdate, number: newNumber });
      }
      setNewName('');
      setNewNumber('');
      return;
    }

    const personObject = {
      id: (persons.length + 1).toString(),
      name: newName,
      number: newNumber,
    };

    // saving new person in server
    phonebookService
      .create( personObject )
      .then( createdPerson => {
        setNotificationMessageToShow(false, `Added ${ createdPerson.name }.`);
        setPersons( persons.concat( createdPerson ))
      })
      .catch( error => {
        if( error.code === AXIOS_ERR_NETWORK_CODE ) {
          setNotificationMessageToShow(true, 'Unsuccessful connection with server.');
        }
      });

    setNewName('');
    setNewNumber('');
  }

  /**
   * Update the data from a person in the backend server
   * @param {Object} person data from the person to be updated
   */
  const updatePerson = ( person ) => {
    phonebookService
      .update( person )
      .then( updatedPerson => {
        console.log('Person updated:', updatedPerson);
        setNotificationMessageToShow(false, `Updated number for ${ updatedPerson.name }.`);
        setPersons( persons.map( person => person.id === updatedPerson.id ? updatedPerson : person ) );
      })
      .catch(error => {
        if( error.code === AXIOS_ERR_NETWORK_CODE ) {
          setNotificationMessageToShow(true, 'Unsuccessful connection with server.');
        }
        if( error.status === 404 ) {
          setNotificationMessageToShow(true, `The person ${ person.name } has already been removed from server.`);
          setPersons( persons.filter( p => p.id !== person.id) );
        }
      });
  }

  /**
   * Remove a person entry in the server
   * @param {String|Number} id 
   * @param {String} name 
   */
  const deletePerson = ( id, name ) => {
    const confirmDelete = window.confirm(`Are you sure to delete ${ name }?`);

    if( ! confirmDelete ) return;
    phonebookService
      .deleteEntry( id )
      .then( deletedPerson => {
        console.log('Person deleted: ', deletedPerson);
        setNotificationMessageToShow(false, `Deleted ${ deletedPerson.name }.`);
        setPersons( persons.filter( person => person.id !== deletedPerson.id) );
      })
      .catch(error => {
        if( error.code === AXIOS_ERR_NETWORK_CODE ) {
          setNotificationMessageToShow(true, 'Unsuccessful connection with server.');
        }
        if( error.status === 404 ) {
          setNotificationMessageToShow(true, `The person ${ name } has already been removed from server.`);
          setPersons( persons.filter( person => person.id !== id) );
        }
      });
  }

  /**
   * Set the notification message in the corresponing state to show temporary
   * @param {Boolean} isErrorMessage true if the notification is due to an error
   * @param {String} message 
   */
  const setNotificationMessageToShow = ( isErrorMessage, message ) => {
    if( isErrorMessage ) {
      setErrorMessage(message);
      setTimeout(()=> setErrorMessage(null), 5000);
      return;
    }
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(null), 5000);
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
        <Notification 
          isErrorMessage={ false }
          message={ successMessage }
        />
        <Notification 
          isErrorMessage={ true }
          message={ errorMessage }
        />
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
        <Persons 
          personsList = { personsToShow } 
          deleteEntry = { deletePerson }
        />
      </div>
    </>
  );
}

export default App;
