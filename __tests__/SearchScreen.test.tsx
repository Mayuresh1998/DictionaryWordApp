import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import SearchScreen from '../src/screens/SearchScreen';
import {NavigationProp} from '@react-navigation/native';
import {searchWord} from '../src/services/api';

jest.mock('../src/services/api');

const mockSearchWord = searchWord as jest.MockedFunction<typeof searchWord>;

describe('SearchScreen', () => {
  const navigationMock = {
    navigate: jest.fn(),
  } as unknown as NavigationProp<any>;

  const routeMock = {
    params: {
      searchTerm: 'found',
    },
  };

  beforeEach(() => {
    mockSearchWord.mockClear();
  });

  it('displays search results when Search button is pressed', async () => {
    mockSearchWord.mockResolvedValueOnce([
      {word: 'example', meaning: 'an instance representing a larger group'},
      {
        word: 'test',
        meaning:
          'a procedure intended to establish the quality, performance, or reliability of something',
      },
    ]);

    const {getByPlaceholderText, getByText} = render(
      // @ts-ignore
      <SearchScreen navigation={navigationMock} route={routeMock} />,
    );

    const searchInput = getByPlaceholderText('Search for a word');
    fireEvent.changeText(searchInput, 'test'); // Simulate typing 'test' into the input

    const searchButton = getByText('Search');
    fireEvent.press(searchButton);

    await waitFor(() => {
      expect(mockSearchWord).toHaveBeenCalledWith('test');
      expect(getByText('example')).toBeTruthy();
      expect(getByText('an instance representing a larger group')).toBeTruthy();
    });
  });

  it('displays "No search results" when no results are found', async () => {
    mockSearchWord.mockResolvedValueOnce([]);

    const {getByPlaceholderText, getByText} = render(
      // @ts-ignore
      <SearchScreen navigation={navigationMock} route={routeMock} />,
    );

    const searchInput = getByPlaceholderText('Search for a word');
    fireEvent.changeText(searchInput, 'test'); // Simulate typing 'test' into the input

    const searchButton = getByText('Search');
    fireEvent.press(searchButton);

    await waitFor(() => {
      expect(mockSearchWord).toHaveBeenCalledWith('test');
      expect(getByText('No search results')).toBeTruthy();
    });
  });

  it('displays an error popup when search fails', async () => {
    mockSearchWord.mockRejectedValueOnce(
      new Error('Failed to fetch search results'),
    );

    const {getByPlaceholderText, getByText} = render(
      // @ts-ignore
      <SearchScreen navigation={navigationMock} route={routeMock} />,
    );

    const searchInput = getByPlaceholderText('Search for a word');
    fireEvent.changeText(searchInput, 'test'); // Simulate typing 'test' into the input

    const searchButton = getByText('Search');
    fireEvent.press(searchButton);

    await waitFor(() => {
      expect(mockSearchWord).toHaveBeenCalledWith('test');
      expect(getByText('Error searching word. Please try again.')).toBeTruthy();
    });
  });
});
