
const Header = (props) => {
  return ( <h1>{props.course}</h1> );
}

const Part = (props) => {
  return (
    <p>{props.content.part} {props.content.exercises}</p>
  );
}

const Content = (props) => {
  return (
    <>
      <Part content = { props.content[0] } />
      <Part content = { props.content[1] } />
      <Part content = { props.content[2] } />
    </>
  );
}

const Total = (props) => {
  const total = props.content.reduce( (acc, item) => acc + item.exercises, 0 );

  return (
    <p>Number of exercises {total}</p>
  );
}

function App() {
  const course = 'Half Stack application development';
  const parts  = [
    { part: 'Fundamentals of React',    exercises: 10},
    { part: 'Using props to pass data', exercises:  7},
    { part: 'State of a component',     exercises: 14},
  ];

  return (
    <>
      <div>
        <Header  course  = { course } />
        <Content content = { parts } />
        <Total   content = { parts } />
      </div>
    </>
  )
}

export default App;
