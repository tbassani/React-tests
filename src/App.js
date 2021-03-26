import { useEffect, useReducer, useState } from 'react';
import './App.css';

import Congrats from './Congrats';
import GuessedWords from './GuessedWords';
import Input from './Input';
import { getSecretWord } from './actions';

const reducer = (prevState, action) => {
  switch (action.type) {
    case 'setSecretWord':
      return { ...prevState, setSecretWord: action.payload };
    default:
      throw new Error('Invalid Action type: ' + action.type);
  }
};

function App() {
  //const [secretWord, setSecretWord] = useState('');
  const [state, dispatch] = useReducer(reducer, { secretWord: null });
  // TODO: get props from shared state
  const success = false;
  const guessedWords = [];

  const setSecretWord = (secretWord) => {
    dispatch({ type: 'setSecretWord', payload: secretWord });
  };

  useEffect(() => {
    getSecretWord(setSecretWord);
  }, []);

  if (state.secretWord === null) {
    return (
      <div className="container" data-test="spinner">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <p>Loading secret word...</p>
      </div>
    );
  }

  return (
    <div data-test="component-app" className="container">
      <h1>Jotto</h1>
      <Congrats success={success} />
      <Input success={success} secretWord={state.secretWord} />
      <GuessedWords guessedWords={guessedWords} />
    </div>
  );
}

export default App;
