import { useState } from 'react'

const Header = props => <h1>{props.text}</h1>;

const Title = props => <h2>{props.text}</h2>;

const Button = ( {onClick, text} ) => <button onClick={ onClick }>{ text }</button>;

const StatisticsLine = ( {text, value} ) => <p>{ text }: { value }</p>;

/**
 * App component that returns the content for the app.
 */
function App() {
  // save clicks of each button to its own state
  const [good, setGood]       = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad]         = useState(0);

  const handleGoodClick    = () => setGood(good + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1);
  const handleBadClick     = () => setBad(bad + 1);

  const total    = good + neutral + bad,
        average  = ((good -bad) / total) || 0,
        positive = (good / total * 100) || 0;

  return (
    <>
      <div>
        <Header text='Give Feedback' />
        <Button 
          onClick = { handleGoodClick } 
          text    = 'Good'
        />
        <Button 
          onClick = { handleNeutralClick } 
          text    = 'Neutral' 
        />
        <Button 
          onClick = { handleBadClick } 
          text    = 'Bad' 
        />
      </div>
      <div>
        <Title text='Statistics' />
        <StatisticsLine 
          text  = 'Good' 
          value = { good } 
        />
        <StatisticsLine 
          text  = 'Neutral' 
          value = { neutral } 
        />
        <StatisticsLine 
          text  = 'Bad' 
          value = { bad } 
        />
        <StatisticsLine 
          text  = 'All' 
          value = { total } 
        />
        <StatisticsLine 
          text  = 'Average' 
          value = { average } 
        />
        <StatisticsLine 
          text  = 'Positive' 
          value = { positive + '%' } 
        />
      </div>
    </>
  )
}

export default App;