import axios from 'axios';

export const getSecretWord = async (setSecretWord) => {
  // TODO: write actual action in Redux / context sections
  const resp = await axios.get('https://random-word-api.herokuapp.com/word?number=1');
  setSecretWord(resp.data[0]);
};
