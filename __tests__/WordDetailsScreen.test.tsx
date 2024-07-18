import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {NavigationProp} from '@react-navigation/native';
import Sound from 'react-native-sound';
import WordDetailsScreen from '../src/screens/WordDetailsScreen';
import {getWordDetails} from '../src/services/api';

jest.mock('../src/services/api');
jest.mock('react-native-sound', () => {
  const mockSound = {
    play: jest.fn(),
    release: jest.fn(),
  };
  return jest.fn().mockImplementation(() => mockSound);
});

const mockGetWordDetails = getWordDetails as jest.Mock;

describe('WordDetailsScreen', () => {
  const navigationMock: Partial<NavigationProp<any>> = {
    navigate: jest.fn(),
  };

  const routeMock = {
    params: {
      word: 'example',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches word details and displays them', async () => {
    mockGetWordDetails.mockResolvedValueOnce({
      word: 'example',
      meanings: [
        {
          definitions: [{definition: 'a representative form or pattern'}],
        },
      ],
      phonetics: [{audio: 'https://example.com/audio.mp3'}],
    });

    const {getByText} = render(
      <WordDetailsScreen
        navigation={navigationMock as NavigationProp<any>}
        route={routeMock}
      />,
    );

    await waitFor(() => {
      expect(getByText('example')).toBeTruthy();
      expect(
        getByText('Definition: a representative form or pattern'),
      ).toBeTruthy();
    });
  });

  it('plays sound when the Play Sound button is pressed', async () => {
    mockGetWordDetails.mockResolvedValueOnce({
      word: 'example',
      meanings: [
        {
          definitions: [{definition: 'a representative form or pattern'}],
        },
      ],
      phonetics: [{audio: 'https://example.com/audio.mp3'}],
    });

    const {getByText} = render(
      <WordDetailsScreen
        navigation={navigationMock as NavigationProp<any>}
        route={routeMock}
      />,
    );

    await waitFor(() => {
      expect(getByText('example')).toBeTruthy();
    });

    const playButton = getByText('Play Sound');
    fireEvent.press(playButton);

    expect(Sound).toHaveBeenCalledTimes(1);

    const soundInstance = new Sound('https://example.com/audio.mp3');
  });

  it('displays an error popup if word details are not available', async () => {
    mockGetWordDetails.mockResolvedValueOnce(null);

    const {getByText} = render(
      <WordDetailsScreen
        navigation={navigationMock as NavigationProp<any>}
        route={routeMock}
      />,
    );

    await waitFor(() => {
      expect(
        getByText('Details are not available for this word.'),
      ).toBeTruthy();
    });

    fireEvent.press(getByText('Close'));

    expect(navigationMock.navigate).toHaveBeenCalledWith('Home');
  });
});
