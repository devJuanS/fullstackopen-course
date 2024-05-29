import { useState } from 'react'

/**
 * Get a random number among a range given
 * @param {number} minValue Minimum value for the outcome
 * @param {number} maxValue Maximum value for the outcome
 * @returns {number} Random number between the minValue and maxValue
 */
const random = ( minValue, maxValue ) => {
  return Math.floor(Math.random() * (maxValue - minValue) + minValue);
}

const Header = props => <h1>{props.text}</h1>;

const Title  = props => <h2>{props.text}</h2>;

const Button = ( {onClick, text} ) => <button onClick={ onClick }>{ text }</button>;

const Quotation = ( {quote} ) => <blockquote>{ quote }</blockquote>;

const VotesLegend = ( {votes} ) => {
  return (
    <p>This anecdote has { votes } vote{ votes !== 1 && 's' }</p>
  );
}

/**
 * Display a section with the most voted anecdote.
 * @param {{number, string, number}} props 
 * @returns 
 */
const AnecdoteMostVoted = ( {points, quote, votes} ) => {
  if ( !points.some( point => point > 0) ) {
    return (
      <>
        <Title text = 'Anecdote with most votes' />
        <p>No votes given</p>
      </>
    );
  }
  
  return (
    <>
      <Title text = 'Anecdote with most votes' />
      <Quotation quote = { quote } />
      <VotesLegend votes = { votes } />
    </>
  );
}

function App() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];
  const [selected, setSelected] = useState(0);
  const [points, setPoints]     = useState(Array(anecdotes.length).fill(0));

  
  const handleNextAnecdoteClick = () => setSelected( random(0, anecdotes.length) );
  
  const handleVoteClick = ( ) => {
    const copyOfPoints = [...points];

    copyOfPoints[selected] +=1;
    setPoints(copyOfPoints);
  }

  const getGreatestValue    = () => points.toSorted( (a, b) => b-a ).at(0);

  const getIndexOfMostVoted = () => points.findIndex( point => point === getGreatestValue() );

  return (
    <>
      <Header text = 'Anecdotes from Software Engieneers' />
      <Title text = 'Anecdote of the day' />
      <Quotation quote = { anecdotes[selected] } />
      <VotesLegend votes = { points[selected] } />
      <Button 
        onClick = { handleVoteClick } 
        text    = 'Vote' 
      />
      <Button 
        onClick = { handleNextAnecdoteClick } 
        text    = 'Next anecdote' 
      />
      <AnecdoteMostVoted 
        points = {[...points]}
        quote  = { anecdotes[getIndexOfMostVoted()] }
        votes  = { getGreatestValue() }
      />
    </>
  );
}

export default App;