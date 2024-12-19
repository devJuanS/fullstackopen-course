import CountryItem from './CountryItem'

/**
 * Component to render a list of countries found based on the filter value.
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

export default RenderCountryList;