import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveUsername = async (username: string) => {
  try {
    await AsyncStorage.setItem('username', username);
  } catch (error) {
    console.error('Failed to save username:', error);
  }
};

export const getUsername = async (): Promise<string | null> => {
  try {
    const username = await AsyncStorage.getItem('username');
    return username;
  } catch (error) {
    console.error('Failed to get username:', error);
    return null;
  }
};
