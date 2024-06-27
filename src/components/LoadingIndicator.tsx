import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

type Props = {
  size?: 'small' | 'large';
  color?: string;
};

const LoadingIndicator: React.FC<Props> = ({
  size = 'large',
  color = '#007bff',
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingIndicator;
