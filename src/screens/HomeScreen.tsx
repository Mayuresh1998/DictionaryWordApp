import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import Button from '../components/Button';
import {NavigationProp} from '@react-navigation/native';

type Props = {
  navigation: NavigationProp<any>;
};

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const [randomWord, setRandomWord] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    fetchRandomWord();
  }, []);

  const fetchRandomWord = async () => {
    try {
      const response = await fetch('http://172.20.10.4:3000/word');
      const data = await response.json();
      setRandomWord(data[0].word);
    } catch (error) {
      console.error('Failed to fetch random word:', error);
    }
  };

  const handleRandomWord = () => {
    navigation.navigate('WordDetails', {word: randomWord});
  };

  const handleSearchFocus = () => {
    navigation.navigate('Search', {searchTerm});
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholder="Search for a word"
        onFocus={handleSearchFocus} // Navigate to SearchScreen on focus
      />
      <Text style={styles.heading}>Welcome to the Home Screen!</Text>
      <Text style={styles.randomWordText}>Random Word: {randomWord}</Text>
      <Button
        title="Generate Random Word"
        onPress={fetchRandomWord}
        style={styles.button}
      />
      <Button
        title="View Word Details"
        onPress={handleRandomWord}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff', // Ensure background color is set for consistent appearance
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    width: '100%',
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  randomWordText: {
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    width: '100%', // Ensure buttons take full width
  },
});

export default HomeScreen;
