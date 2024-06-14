/**
 * Define the component containing the name of the course
 * @param {Object} props Object with the information about the course
 * @returns React component
 */
const Header = ( { course } ) => {
  return ( <h1>{course.name}</h1> );
}

/**
 * Define the component containing the information for a course part
 * @param {Object} part Object with the information about the course part
 * @returns React component
 */
const Part = ( { part } ) => {
  return ( <p>{ part.name } { part.exercises }</p> );
}

/**
 * Define the component containing the information about each parts from a course
 * @param {Array<Object>} parts Array of objects with the information about all parts in the course
 * @returns React component
 */
const Content = ( { parts } ) => {
  return (
    <>
      <div>
        {
          parts.map( part => 
            <Part 
              key  = { part.id }
              part = { part }
            />
            )
        }
      </div>
    </>
  );
}

/**
 * Define the component containing  the amount of exercises in the course
 * @param {Array<Object>} props Objects with the title and amount of exercises for each course part
 * @returns React component
 */
const Total = ( { parts } ) => {
  const total = parts.reduce( (acc, part) => acc + part.exercises, 0 );

  return (
    <p><strong>Total of {total} exercise{ total > 1 && `s` }</strong></p>
  );
}

/**
 * Define the component containing all the information about a course
 * @param {Object} param0 Information about the course
 * @returns React Component
 */
const Course = ( { course } ) => {
  return (
    <>
      <div>
          <Header  course = { course } />
          <Content parts  = { course.parts } />
          <Total   parts  = { course.parts } />
      </div>
    </>
  );
}

export default Course;