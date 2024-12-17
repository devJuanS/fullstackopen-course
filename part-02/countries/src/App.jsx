import { useState, useEffect } from "react";
import axios from 'axios';
import remoteCountryToModels from "./mappers/remote-country.mapper";

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/';
const SHOW_COUNTRIES_LIMIT        = 10;
// const NOT_FOUND_COUNTRY_CODE      = -1;
// const TOO_MANY_MATCHES_CODE       =  0;
// const SHOW_COUNTRY_INFO_CODE      =  1;
// const SHOW_LIST_OF_COUNTRIES_CODE =  2;

/**
 * Filter component to show countries according the entered value. 
 * @param {props} filterName Value to be filtered
 * @param {props} onChange   Handle function for the input control
 * @returns React component
 */
const Filter = ( {filterLabel, filterName, onChange} ) => {
  
  return (
    <>
      <div>
        { filterLabel }
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
 * Component to render a notification message
 * @param {Boolean} isErrorMessage true if the notification is due to an error
 * @param {String} message 
 * @returns React component
 */
const Notification = ( { isErrorMessage, message } ) => {
  const normalNotificationStyle = {
    fontStyle: 'italic'
  };
  const errorNotificationStyle  = {
    marginBlockStart: 12,
    marginBlockEnd: 12,
    padding: 8,
    color: 'red',
    fontSize: 20,
    backgroundColor: 'lightgrey',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: 'red',
    borderRadius: 8
  };
  const notificationStyle = isErrorMessage ? errorNotificationStyle : normalNotificationStyle;

  if( message === null ) return null;

  return (
    <div style={ notificationStyle }>
      { message }
    </div>
  );
}

/**
 * Component to render a list item to show/hide country information
 * @param {Object<Country>} country data for a country 
 * @returns 
 */
const CountryItem = ( {country} ) => {
  const [show, setShow] = useState(false);

  /**
   * Event handler to change the show state when click is pressed
   */
  const handleClick = () => setShow( !show );

  return (
    <>
      <li>
        { country.name }
        <button onClick={ handleClick }>◀ { !show ? 'Show' : 'Hide' }</button>
        {show && <RenderCountryInfo countryInfo = { country } />}
      </li>
    </>
  );
}

/**
 * Component to render a list
 * @param {String} label text to render before the list
 * @param {Array<String>} list
 * @returns 
 */
const RenderCountryList = ({ countries }) => {
  if( !countries.length ) return null;

  return (
    <>
      <p>Countries matches:</p>
      <ul>
        { 
          countries.map( (country, index) => 
            <CountryItem 
              key     = { index }
              country = { country } 
            />
          )
        }
      </ul>
    </>
  );
}

/**
 * Render component to show the information of  country
 * @param {Country} countryInfo information to be rendered as searching result
 * @returns React component
 */
const RenderCountryInfo = ( {countryInfo} ) => {
  if( countryInfo === null ) return;

  return (
    <>
      <h2>{ countryInfo.name }</h2>
      { countryInfo.capital.length > 1 ? 'Capitales:' : 'Capital: ' }
      { countryInfo.capital.toString() }
      <div>Area: { countryInfo.area }</div>
      <div>
        Languages: { Object.values(countryInfo.languages).toString() }
      </div>
      <br />
      <div>
        <img src={ countryInfo.flag } alt={ `Flag from ${ countryInfo.name }` } width="200" />
      </div>
    </>
  );
}

/**
 * Component to render content based on the filter search
 * @param {Array<Country>} countries data for the countries from backend
 * @param {string} filterValue filter to apply to the search
 * @returns React component
 */
const SearchResult = ( {countries, filterValue} ) => {
  if( countries === null || !countries.length ) return null;
  if( !filterValue.length ) return null;

  const filteredCountries = countries.filter( country => country.name.toLowerCase().includes(filterValue.toLowerCase()) );
  
  if( !filteredCountries.length ) {
    console.log('error',filteredCountries.length, filterValue);
    return (
      <Notification 
      isErrorMessage = { true }
      message        = { `Country matches with ${ filterValue } was not found!` } 
      />
    );
  }
  if( filteredCountries.length > SHOW_COUNTRIES_LIMIT ) {
    return (
      <Notification 
      isErrorMessage = { false }
      message        = { 'Too many matches, specify another filter.' } 
      />
    );
  }
  if( filteredCountries.length === 1 ) {
    return ( <RenderCountryInfo countryInfo = { filteredCountries[0] } /> );
  }
  
  return (
    <RenderCountryList 
        countries = { filteredCountries }
    />
  );
}

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
