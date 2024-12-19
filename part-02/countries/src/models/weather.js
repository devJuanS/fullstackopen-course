
/**
 * Class that represent the Weather data model based on information in the backend.
 */
export class Weather {

  /**
   * 
   * @param {Like<Weather>} weatherDataLike 
   */
  constructor ({temperature, windSpeed, iconId, description,}) {
      this.temperature = temperature;
      this.windSpeed   = windSpeed;
      this.iconId      = iconId; 
      this.description = description;
  }
}
