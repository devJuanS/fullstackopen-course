
/**
 * Filter component to display an input control to find a country according to the entered value.
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

export default Filter;