import { Text, Button as NButton } from 'native-base';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function Button({ title, onPress, disabled }) {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <NButton onPress={onPress} full rounded disabled={disabled}>
          <Text>{title}</Text>
        </NButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 50,
  },
  wrapper: {
    width: '80%',
  },
});
