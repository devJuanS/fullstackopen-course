/**
 * Component to show the information of the country.
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

export default RenderCountryInfo;