/**
 * Define the component containing the name of the course
 * @param {Object} props Object with the information about the course
 * @returns 
 */
const Header = (props) => {
  return ( <h1>{props.course.name}</h1> );
}

/**
 * Define the component containing the information for a course part
 * @param {Object} props Object with the information about the course
 * @returns 
 */
const Part = (props) => {
  return (
    <p>{props.parts.part} {props.parts.exercises}</p>
  );
}

/**
 * Define the component containing the information for the entire course
 * @param {Array<Object>} props Objects with the title and amount of exercises for each course part
 * @returns 
 */
const Content = (props) => {
  return (
    <>
      <Part parts = { props.parts[0] } />
      <Part parts = { props.parts[1] } />
      <Part parts = { props.parts[2] } />
    </>
  );
}

/**
 * Define the component containing  the amount of exercises in the course
 * @param {Array<Object>} props Objects with the title and amount of exercises for each course part
 * @returns 
 */
const Total = (props) => {
  const total = props.parts.reduce( (acc, item) => acc + item.exercises, 0 );

  return (
    <p>Number of exercises {total}</p>
  );
}

function App() {
  const course = {
    name:  'Half Stack application development',
    parts: [
      { part: 'Fundamentals of React',    exercises: 10},
      { part: 'Using props to pass data', exercises:  7},
      { part: 'State of a component',     exercises: 14},
    ],
  };

  return (
    <>
      <div>
        <Header  course = { course } />
        <Content parts  = { course.parts } />
        <Total   parts  = { course.parts } />
      </div>
    </>
  )
}

export default App;
