import { useState } from 'react'

const Header = props => <h1>{props.text}</h1>;

const Title = props => <h2>{props.text}</h2>;

const Button = ( {onClick, text} ) => <button onClick={ onClick }>{ text }</button>;

const StatisticsLine = ( {text, value} ) => <p>{ text }: { value }</p>;

function App() {
  // save clicks of each button to its own state
  const [good, setGood]       = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad]         = useState(0);

  const handleGoodClick    = () => setGood(good + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1);
  const handleBadClick     = () => setBad(bad + 1);

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
          text  = 'Badd' 
          value = { bad } 
        />
      </div>
    </>
  )
}

export default App;