import { useState } from "react";
import RenderCountryInfo from './RenderCountryInfo';
/**
 * Component to render a list item with the feature to show/hide country information
 * @param {Object<Country>} country data for a country 
 * @returns React component
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

export default CountryItem;
