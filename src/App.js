import { useEffect, useReducer, useState } from 'react';
import './App.css';

import Congrats from './Congrats';
import GuessedWords from './GuessedWords';
import Input from './Input';
import LanguagePicker from './LanguagePicker';

import { getSecretWord } from './actions';

import languageContext from './contexts/languageContext';
import successContext from './contexts/successContext';
import guessedWordsContext from './contexts/guessedWordsContext';

const reducer = (prevState, action) => {
  switch (action.type) {
    case 'setSecretWord':
      return { ...prevState, secretWord: action.payload };
    case 'setLanguage':
      return { ...prevState, language: action.payload };
    default:
      throw new Error('Invalid Action type: ' + action.type);
  }
};

function App() {
  //const [secretWord, setSecretWord] = useState('');
  const [state, dispatch] = useReducer(reducer, { secretWord: null, language: 'en' });
  // TODO: get props from shared state

  const setSecretWord = (secretWord) => {
    dispatch({ type: 'setSecretWord', payload: secretWord });
  };

  const setLanguage = (language) => {
    dispatch({ type: 'setLanguage', payload: language });
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
      <p>The secret word is: {state.secretWord}</p>
      <languageContext.Provider value={state.language}>
        <LanguagePicker setLanguage={setLanguage} />
        <guessedWordsContext.GuessedWordsProvider>
          <successContext.SuccessProvider>
            <Congrats />
            <Input secretWord={state.secretWord} />
          </successContext.SuccessProvider>
          <GuessedWords />
        </guessedWordsContext.GuessedWordsProvider>
      </languageContext.Provider>
    </div>
  );
}

export default App;
