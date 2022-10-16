import { useState } from "react";

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>{text}</button>
  );
};

const Display = ({ value }) => {
  return (
    <p>{value}</p>
  )
};

const Anecdote = ({ text }) => {
  return (
    <i>{text}</i>
  );
};

const Heading = ({ text }) => {
  return (
    <h1>{text}</h1>
  );
};

const App = () => {

  const anecdotes =  [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [selected, setSelected] = useState(0);  
  const [points, setPoints] = useState(Array.from(Array(anecdotes.length).fill(0)));

  const pointsCopy = [...points];

  const voteBtnHandler = () => {   
    pointsCopy[selected] = points[selected]+1;
    const newState = [...pointsCopy];
    setPoints(newState);
  };  
  
  const nextAnecdoteBtnHandler = () => {
    const getRandomAnecdoteIndex = () => Math.floor(Math.random()*(anecdotes.length-1));
    let randomAnecdoteIndex = getRandomAnecdoteIndex();
    while(randomAnecdoteIndex===selected){
      randomAnecdoteIndex = getRandomAnecdoteIndex();
    }
    setSelected(randomAnecdoteIndex);
  };  

  const mostVotes = (() => {

    const value = () => points.reduce((a, b) => Math.max(a, b), -Infinity);
        
    const text = () => points.indexOf(value());

    return {
      value,
      text,
    };
  })();
  
  
  return (
    <div>
      <Heading text='Anecdote of the day' />
      <Anecdote text={anecdotes[selected]}/>
      <Display value={points[selected]} />
      <Button onClick={voteBtnHandler} text='vote' />
      <Button onClick={nextAnecdoteBtnHandler} text='next anecdote' />
      <Heading text='Anecdote with most votes' />
      <Anecdote text={anecdotes[mostVotes.text()]} />
      <Display value={mostVotes.value()} />       
    </div>
  );

};

export default App;