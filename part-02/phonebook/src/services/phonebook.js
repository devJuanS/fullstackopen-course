import axios from 'axios';

// const baseURL = 'http://localhost:3001/persons';   //<< data in the JSON database
const baseURL = 'http://localhost:3001/api/persons';  //<< data in the backend server

/**
 * Post a new register in the backend server
 * @param {Object} person data from the person to be created
 * @returns {Promise<Object>} object consists of data from the person created
 */
const create = ( person ) => {
  const request = axios.post( baseURL, person );
  return request.then( res => res.data );
}

/**
 * Fetch entire data from the server
 * @returns {Promise<Object>}
 */
const getAll = () => {
  const request = axios.get(baseURL);
  return request.then( res => res.data );
}

/**
 * Update the information from a person
 * @param {Object} person data from the person to be updated
 * @returns {Promise<Object>} object consists of data from the person updated
 */
const update = ( person ) => {
  const request = axios.put( `${ baseURL }/${ person.id }`, person );
  return request.then( res => res.data );
}

/**
 * Delete a person entry in the backend server
 * @param {String | Number} id in the server from the entry to be deleted
 * @returns {Promise<Object>} data from the deleted entry
 */
const deleteEntry = ( id ) => {
  const request = axios.delete(`${ baseURL }/${ id }`);
  return request.then( res => res.data );
}

export default { create, getAll, update, deleteEntry };