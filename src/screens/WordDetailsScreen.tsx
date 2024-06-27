import React, {useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet, Platform} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {getWordDetails} from '../services/api';
import ErrorPopup from '../components/ErrorPopup';

type Props = {
  route: any;
  navigation: NavigationProp<any>;
};

const WordDetailsScreen: React.FC<Props> = ({route, navigation}) => {
  const {word} = route.params;
  const [details, setDetails] = useState<any>(null);
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getWordDetails(word);
        if (!data) {
          setErrorMessage('Details are not available for this word.');
          setErrorVisible(true);
        } else {
          setDetails(data);
          setErrorVisible(false);
        }
      } catch (error: any) {
        if (error.message === 'NotFound') {
          setErrorMessage('Details are not available for this word.');
        } else {
          setErrorMessage('Error fetching word details. Please try again.');
        }
        setErrorVisible(true);
      }
    };

    fetchDetails();
  }, [word]);

  const handlePlaySound = () => {
    if (details && details.phonetics.length > 0 && details.phonetics[0].audio) {
      // Implement play sound functionality here
      console.log('Play sound:', details.phonetics[0].audio);
    }
  };

  const handleCloseError = () => {
    setErrorVisible(false);
    navigation.navigate('Home'); // Navigate back to the Home screen
  };

  return (
    <View style={styles.container}>
      {details ? (
        <View style={styles.detailsContainer}>
          <Text style={styles.wordText}>{details.word}</Text>
          <Text style={styles.definitionText}>
            Definition: {details.meanings[0].definitions[0].definition}
          </Text>
          {details.phonetics.length > 0 && details.phonetics[0].audio && (
            <Button title="Play Sound" onPress={handlePlaySound} />
          )}
        </View>
      ) : null}
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
  detailsContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 20,
    borderRadius: 10,
  },
  wordText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  definitionText: {
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    alignSelf: 'flex-start',
    ...Platform.select({
      ios: {
        backgroundColor: 'blue',
      },
      android: {
        backgroundColor: 'green',
      },
    }),
  },
});

export default WordDetailsScreen;
