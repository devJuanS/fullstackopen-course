import { useState, useEffect } from "react";
import axios from 'axios';
import remoteCountryToModels from "./mappers/remote-country.mapper";

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/';
const SHOW_COUNTRIES_LIMIT        = 10;
const NOT_FOUND_COUNTRY_CODE      = -1;
const TOO_MANY_MATCHES_CODE       =  0;
const SHOW_COUNTRY_INFO_CODE      =  1;
const SHOW_LIST_OF_COUNTRIES_CODE =  2;

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
 * Component to render a list
 * @param {String} label text to render before the list
 * @param {Array<String>} list
 * @returns 
 */
const RenderList = ({ label, list }) => {
  if( !list.length ) return null;

  return (
    <>
      <p>{ label }:</p>
      <ul>
        { 
          list.map( (item, index) => <li key={ index }>{ item }</li>)
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
 * Component to render based on type of content
 * @param {Object} data content type to render and content itself
 * @returns React component
 */
const SearchResult = ( {data} ) => {
  if( data === null ) return null;
  if( data.contentType === NOT_FOUND_COUNTRY_CODE ) {
    return (
      <Notification 
        isErrorMessage = { true }
        message        = { data.content } 
      />
    );
  }
  if( data.contentType === TOO_MANY_MATCHES_CODE ) {
    return (
        <Notification 
          isErrorMessage = { false }
          message        = { data.content } 
        />
    );
  }
  if( data.contentType === SHOW_LIST_OF_COUNTRIES_CODE ) {
    return (
      <RenderList 
        label = { 'Countries matches: ' }
        list  = { data.content }
      />
    );
  }
  return (<RenderCountryInfo countryInfo = { data.content } />);
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
   * Search the country that matches with the filter
   */
  const searchCountry = () => {
    const countriesFound = countriesData.filter( country => country.name.toLowerCase().includes(filterCountry.toLowerCase()) );

    if( !countriesFound.length ) {
      return (
        {
          contentType: NOT_FOUND_COUNTRY_CODE, 
          content: `Country matches with ${ filterCountry } was not found!`
        }
      );
    }
    if( countriesFound.length > SHOW_COUNTRIES_LIMIT ) {
      return (
        {
          contentType: TOO_MANY_MATCHES_CODE, 
          content: 'Too many matches, specify another filter.'
        }
      );
    }
    if( countriesFound.length > 1  ) {
      return (
        {
          contentType: SHOW_LIST_OF_COUNTRIES_CODE, 
          content: countriesFound.map( country => country.name )
        }
      );
    }

    const countryInfo = countriesFound[0];
    return (
      {
        contentType: SHOW_COUNTRY_INFO_CODE, 
        content: countryInfo
      }
    );
  }

  const dataToShow = !filterCountry ? null : searchCountry();
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
      <SearchResult data = { dataToShow } />
    </>
  )
}

export default App;
