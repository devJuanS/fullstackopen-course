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

  return (
    <>
      <p>{ anecdotes[selected] }</p>
      <p>This anecdote has { points[selected] } votes</p>
      <button onClick={ handleVoteClick }>Vote</button>
      <button onClick={ handleNextAnecdoteClick }>Next anecdote</button>
    </>
  );
}

export default App;