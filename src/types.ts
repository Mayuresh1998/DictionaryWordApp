type User = {
  username: string;
  password: string;
};

type Word = {
  word: string;
  meaning: string;
  phonetics: {
    audio: string;
  }[];
};

export type {User, Word};
