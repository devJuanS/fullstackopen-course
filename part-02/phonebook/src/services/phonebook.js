import axios from 'axios';

const baseURL = 'http://localhost:3001/persons';

/**
 * Post a new register in the backend server
 * @param {Object} person with data from the person to create 
 * @returns {Promise<Object>} object consist of data form the person created
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
 * Delete a person entry in the backend server
 * @param {String | Number} id 
 * @returns {Promise<Object>} data from the deleted entry
 */
const deleteEntry = ( id ) => {
  const request = axios.delete(`${ baseURL }/${ id }`);
  return request.then( res => res.data );
}

export default { create, getAll, deleteEntry, };