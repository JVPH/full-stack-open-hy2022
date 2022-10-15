import { useState } from "react";

const Button = ({ onClick, text }) => {

  return (
    <button onClick={onClick}>{text}</button>
  );

};

const Statistics = ({ good, neutral, bad }) => {
    
  const total = good+neutral+bad;

  const average = () => (good-bad)/total;

  const positiveAverage = () => `${(good/total)*100} %`;

  return (
    <table>
      <tbody>      
        <StatisticsLine text='good' value={good} />
        <StatisticsLine text='neutral' value={neutral} />
        <StatisticsLine text='bad' value={bad} />
        <StatisticsLine text='all' value={total} />
        <StatisticsLine text='average' value={average()} />
        <StatisticsLine text='positive' value={positiveAverage()} />
      </tbody>
    </table>    
  );
};

const StatisticsLine = ({ text, value}) => {

  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>    
  );
};

const Heading = ({ text }) => {

  return (
    <h1>{text}</h1>
  );  
};

const App = () => {

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);    

  const handleGoodBtnClick = () => {
    setGood(good+1);
  };

  const handleNeutralBtnClick = () => {
    setNeutral(neutral+1);
  };

  const handleBadBtnClick = () => {
    setBad(bad+1);
  };

  const nOfAllClicks = good+bad+neutral;

  if(nOfAllClicks===0){
    return (
      <div>
        <Heading text='give feedback'/>  
        <Button onClick={handleGoodBtnClick} text='good'/>
        <Button onClick={handleNeutralBtnClick} text='neutral'/>
        <Button onClick={handleBadBtnClick} text='bad'/>
        <Heading text='statistics' />
        <p>No feedback given</p> 
      </div>
    )
  }

  return (
    <div>
      <Heading text='give feedback'/>  
      <Button onClick={handleGoodBtnClick} text='good'/>
      <Button onClick={handleNeutralBtnClick} text='neutral'/>
      <Button onClick={handleBadBtnClick} text='bad'/>
      <Heading text='statistics' />            
      <Statistics good={good} neutral={neutral} bad={bad}/>            
    </div>
  );
}

export default App;
