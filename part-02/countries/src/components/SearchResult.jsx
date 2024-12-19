import Notification from './Notification';
import RenderCountryInfo from './RenderCountryInfo';
import RenderCountryList from './RenderCountryList';
import WeatherReport from './WeatherReport';

const SHOW_COUNTRIES_LIMIT = 10;

/**
 * Component to render the content of the search based on the filter value.
 * @param {Array<Country>} countries data for the countries from backend
 * @param {string} filterValue filter to apply to the search
 * @returns React component
 */
const SearchResult = ( {countries, filterValue} ) => {
  if( countries === null || !countries.length ) return null;
  if( !filterValue.length ) return null;

  const filteredCountries = countries.filter( country => country.name.toLowerCase().includes(filterValue.toLowerCase()) );
  
  if( !filteredCountries.length ) {
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
    return ( 
      <>
        <RenderCountryInfo countryInfo = { filteredCountries[0] } /> 
        <WeatherReport     city        = { filteredCountries[0].capital } />
      </>
    );
  }
  
  return (
    <RenderCountryList 
        countries = { filteredCountries }
    />
  );
}

export default SearchResult;