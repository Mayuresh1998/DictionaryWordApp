import axios from 'axios';

const DICTIONARY_API_BASE_URL =
  'https://api.dictionaryapi.dev/api/v2/entries/en';

export const searchWord = async (word: string) => {
  if (!word) {
    return [];
  }

  try {
    const response = await axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
    );
    const data = response.data;

    if (data.title === 'No Definitions Found') {
      return [];
    }

    return data.map((entry: any) => ({
      word: entry.word,
      meaning: entry.meanings[0].definitions[0].definition,
    }));
  } catch (error) {
    //console.error('Error searching word:', error);
    return [];
  }
};

export const getWordDetails = async (word: string): Promise<any> => {
  try {
    const response = await axios.get(`${DICTIONARY_API_BASE_URL}/${word}`);
    return response.data[0];
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      throw new Error('NotFound');
    } else {
      throw new Error('Failed to fetch word details');
    }
  }
};
