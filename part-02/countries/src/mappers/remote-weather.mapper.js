import { Weather } from '../models/weather';

/**
 * Translate the data how are defined in the backend side into frontend Weather model.
 * @param {Object} remoteWeatherData data with variables defined by backend side
 * @returns {Like<Weather>}
 */
const remoteWeatherToModel = ( remoteWeatherData ) => {
  const temperature = remoteWeatherData.main.temp;
  const windSpeed   = remoteWeatherData.wind.speed;
  const iconId      = remoteWeatherData.weather[0].icon;
  const description = remoteWeatherData.weather[0].description;

  return new Weather({
    temperature,
    windSpeed,
    iconId,
    description,
  });
}

export default remoteWeatherToModel;