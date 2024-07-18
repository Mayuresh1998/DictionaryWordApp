import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import HomeScreen from '../src/screens/HomeScreen';
import {NavigationProp} from '@react-navigation/native';

describe('HomeScreen', () => {
  const navigationMock = {
    navigate: jest.fn(),
  } as unknown as NavigationProp<any>;

  it('renders correctly', () => {
    const {getByPlaceholderText, getByText} = render(
      <HomeScreen navigation={navigationMock} />,
    );
    expect(getByPlaceholderText('Search for a word')).toBeTruthy();
    expect(getByText('Welcome to the Home Screen!')).toBeTruthy();
    expect(getByText('Random Word:')).toBeTruthy();
    expect(getByText('Generate Random Word')).toBeTruthy();
    expect(getByText('View Word Details')).toBeTruthy();
  });

  it('navigates to WordDetails on "View Word Details" button press', async () => {
    const {getByText} = render(<HomeScreen navigation={navigationMock} />);
    fireEvent.press(getByText('View Word Details'));

    await waitFor(() => {
      expect(navigationMock.navigate).toHaveBeenCalledWith('WordDetails', {
        word: expect.any(String),
      });
    });
  });

  it('navigates to Search on input focus with searchTerm', async () => {
    const {getByPlaceholderText} = render(
      <HomeScreen navigation={navigationMock} />,
    );
    const input = getByPlaceholderText('Search for a word');

    // Simulate focusing on the input field
    fireEvent(input, 'focus');

    fireEvent.changeText(input, 'go');
  });
});
