import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import LoginScreen from '../src/screens/LoginScreen';
import {NavigationProp} from '@react-navigation/native';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(() => Promise.resolve(null)),
}));

describe('LoginScreen', () => {
  it('renders correctly', () => {
    const {getByPlaceholderText, getByRole} = render(
      <LoginScreen
        navigation={{navigate: jest.fn()} as unknown as NavigationProp<any>}
      />,
    );
    expect(getByPlaceholderText('Username')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByRole('button', {name: 'Login'})).toBeTruthy();
  });

  it('navigates to Home on login', async () => {
    const navigateMock = jest.fn();
    const {getByPlaceholderText, getByRole} = render(
      <LoginScreen
        navigation={{navigate: navigateMock} as unknown as NavigationProp<any>}
      />,
    );

    fireEvent.changeText(getByPlaceholderText('Username'), 'testuser');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password');
    fireEvent.press(getByRole('button', {name: 'Login'}));

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith('Home');
    });
  });
});
