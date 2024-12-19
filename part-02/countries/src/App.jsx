import { useState, useEffect } from "react";
import axios from 'axios';
import remoteCountryToModels from "./mappers/remote-country.mapper";
import Filter from './components/Filter';
import SearchResult from './components/SearchResult';

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/';

function App() {
  const [countriesData, setCountriesData] = useState([]);
  const [filterCountry, setFilterCountry] = useState('');

  useEffect(() => {
    axios
      .get(`${ baseUrl }/all`)
      .then(response => {
        setCountriesData( response.data.map( country => remoteCountryToModels( country ) ) );
      });
  }, []);

   /**
   * Event handler to synchronizes the changes made to the input with the component's state
   * @param {HTMLInputElement} event
   */
  const handleFilterChange = ( event ) => setFilterCountry( event.target.value );

  return (
    <>
      <h1>Countries Information</h1>
      <Filter 
        filterLabel = { 'Find countries '}
        filterName  = { filterCountry }
        onChange    = { handleFilterChange }
      />
      <SearchResult 
        countries   = { countriesData } 
        filterValue = { filterCountry }
      />
    </>
  )
}

export default App;
