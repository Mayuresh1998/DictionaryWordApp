import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {searchWord} from '../services/api';
import ErrorPopup from '../components/ErrorPopup';

type WordResult = {
  word: string;
  meaning: string;
};

type Props = {
  navigation: NavigationProp<any>;
  route: RouteProp<{params: {searchTerm: string}}, 'params'>;
};

const SearchScreen: React.FC<Props> = ({navigation, route}) => {
  const [searchTerm, setSearchTerm] = useState(route.params?.searchTerm || '');
  const [searchResults, setSearchResults] = useState<WordResult[]>([]);
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = async () => {
    if (searchTerm.trim()) {
      try {
        const results = await searchWord(searchTerm);
        if (results.length === 0) {
          setErrorMessage('No results found. Please try again.');
          setErrorVisible(true);
        } else {
          setSearchResults(results);
          setErrorVisible(false);
        }
      } catch (error) {
        //', error);
        setErrorMessage('Error searching word. Please try again.');
        setErrorVisible(true);
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
      setErrorVisible(false);
    }
  };

  const handleChangeText = (text: string) => {
    setSearchTerm(text);
    if (!text.trim()) {
      setSearchResults([]);
    }
    setErrorVisible(false); // Hide error popup when changing text
  };

  const renderItem = ({item}: {item: WordResult}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('WordDetails', {word: item.word})}>
      <Text style={styles.wordText}>{item.word}</Text>
      <Text style={styles.meaningText}>{item.meaning}</Text>
    </TouchableOpacity>
  );

  const handleCloseError = () => {
    setErrorVisible(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={searchTerm}
        onChangeText={handleChangeText}
        placeholder="Search for a word"
      />
      <Button title="Search" onPress={handleSearch} />
      <FlatList
        style={styles.flatList}
        data={searchResults}
        renderItem={renderItem}
        keyExtractor={item => item.word}
        ListEmptyComponent={
          <Text style={styles.emptyListText}>No search results</Text>
        }
      />
      <ErrorPopup
        visible={errorVisible}
        message={errorMessage}
        onClose={handleCloseError}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    fontSize: 16,
    ...Platform.select({
      ios: {
        paddingVertical: 8,
      },
      android: {
        paddingVertical: 0,
      },
    }),
  },
  flatList: {
    flex: 1,
    width: '100%',
    marginTop: 10,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  wordText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  meaningText: {
    fontSize: 16,
    color: '#333',
  },
  emptyListText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: '#999',
  },
});

export default SearchScreen;
