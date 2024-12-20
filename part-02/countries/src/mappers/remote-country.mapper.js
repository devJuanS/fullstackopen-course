import { Country } from '../models/country';

/**
 * Translate the data how are defined in the backend side into frontend Country model.
 * @param {Object} remoteCountry data with variables defined by backend side
 * @returns {Like<Country>}
 */
const remoteCountryToModels = ( remoteCountry ) => {
  
  const name         = remoteCountry.name.common;
  const officialName = remoteCountry.name.official;
  const flag         = remoteCountry.flags.svg;
  const {
    capital,
    area,
    languages,
  } = remoteCountry;

  return new Country({
    name,
    officialName,
    capital,
    area,
    languages,
    flag,
  });
}

export default remoteCountryToModels;