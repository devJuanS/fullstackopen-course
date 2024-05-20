
const Header = (props) => {
  return ( <h1>{props.course}</h1> );
}

const Content = (props) => {
  return (
    <>
      <p>
        {props.part1} {props.exercises1}
      </p>
      <p>
        {props.part2} {props.exercises2}
      </p>
      <p>
        {props.part3} {props.exercises3}
      </p>
    </>
  );
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.total}</p>
  );
}

function App() {
  const course     = 'Half Stack application development',
        part1      = 'Fundamentals of React',    
        exercises1 = 10,
        part2      = 'Using props to pass data', 
        exercises2 = 7,
        part3      = 'State of a component',     
        exercises3 = 14;

  return (
    <>
      <div>
        <Header course={ course } />
        <Content 
          part1={ part1 } exercises1={ exercises1 }
          part2={ part2 } exercises2={ exercises2 }
          part3={ part3 } exercises3={ exercises3 }
        />
        <Total total={exercises1 + exercises2 + exercises3} />
      </div>
    </>
  )
}

export default App;
