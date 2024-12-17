
/**
 * Class that represent a Country based on information in the backend
 */
export class Country {
  
  /**
   * 
   * @param {Like<Country>} countryDataLike 
   */
  constructor ({ name, officialName, capital, area, languages, flag }) {
    this.name         = name; 
    this.officialName = officialName; 
    this.capital      = capital; 
    this.area         = area; 
    this.languages    = languages; 
    this.flag         = flag;
  }
}