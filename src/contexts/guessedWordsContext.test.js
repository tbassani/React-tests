import React from 'react';
import { shallow, mount } from 'enzyme';
import guessedWordsContext from './guessedWordsContext';

const FunctionalComponent = () => {
  guessedWordsContext.useGuessedWords();
  return <div></div>;
};

test('useGuessedWords throws an error when not wrapped in GuessedWordsProvider', () => {
  expect(() => {
    shallow(<FunctionalComponent />);
  }).toThrow();
});

test('useGuessedWords does not throw an error when wrapped in GuessedWordsProvider', () => {
  expect(() => {
    mount(
      <guessedWordsContext.GuessedWordsProvider>
        <FunctionalComponent />
      </guessedWordsContext.GuessedWordsProvider>
    );
  }).not.toThrow();
});
