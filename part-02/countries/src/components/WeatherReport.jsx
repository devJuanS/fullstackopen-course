import { useState, useEffect } from "react";
import axios from "axios";
import remoteWeatherToModels from "../mappers/remote-weather.mapper";

const BASE_URL_API  = 'https://api.openweathermap.org/data/2.5/';
const BASE_URL_ICON = 'https://openweathermap.org/img/wn/';
const apiKey        = import.meta.env.VITE_OPENWEATHER_API_KEY;

/**
 * Component to render the information of city weather.
 * @param {string} city
 * @returns React component
 */
const WeatherReport = ( {city} ) => {
  const [cityWeather, setCityWeather] = useState({});
  
  useEffect(() => {
    const urlAPI = `${ BASE_URL_API }weather?q=${ city }&APPID=${ apiKey }&units=metric`;
    axios
      .get(urlAPI)
      .then(response => setCityWeather( remoteWeatherToModels( response.data ) ))
      .catch(() => {
        setCityWeather( {
          temperature: '--',
          windSpeed:   '--',
          iconId:      '--',
          description: 'Information did not fetched successfully',
        });
        throw new Error("Error with weather API");
      });
  }, [city]);
  
  return (
    <>
      <h3>Weather in { city }</h3>
      <p>Temperature { cityWeather.temperature } Celcius</p>
      <img src={`${ BASE_URL_ICON + cityWeather.iconId }@4x.png`} alt={ cityWeather.description } />
      <p>Wind { cityWeather.windSpeed } m/s</p>
    </>
  );
}

export default WeatherReport;