import React,{useState,useEffect} from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [qoute, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    quoteGenerator();
  }, [])
  

  const quoteGenerator = async (e) => {
    if(e){
      e.preventDefault();
    }
    try{
      const res = await axios.get(`https://api.quotable.io/quotes/random?tags=${inputValue}`);
      console.log(res);
      if(res.data && res.data.length > 0){
        const newQuote = res.data[0].content;
        const newAuthor = res.data[0].author;
        setQuote(newQuote);
        setAuthor(`-${newAuthor}`);
      }else{
        setQuote("Sorry no quotes found");
        setAuthor(null);
      }
    }catch(err){
      console.log(err);

    }
  }
  return (
    <div className='App'>
      <h1>Quote Generator</h1>
      <label htmlFor='tags'>Tags: </label>
      <input id='tags' value={inputValue} type='text' placeholder=' ex: inspirational, comedy etc..' onChange={(e) => setInputValue(e.target.value)} />
      <button onClick={quoteGenerator}>Genarate</button>
      <br/>
      <br/>
      <p>{qoute}</p>
      <p>{author}</p>
    </div>
  )
}

export default App