import { Ionicons } from '@expo/vector-icons';
import { Container } from 'native-base';
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Card from '../components/TweetCard';

export default function HomeScreen({ navigation }) {
  return (
    <Container>
      <ScrollView style={styles.container}>
        <Card
          userName="Masayuki Yamaji"
          content="ここに文章が入ります。"
          imageUrl="https://reactjs.org/logo-og.png"
        />
        <Card userName="Masayuki Yamaji" content="ここに文章が入ります。" />
        <Card
          userName="Masayuki Yamaji"
          content="ここに文章が入ります。"
          imageUrl="https://reactjs.org/logo-og.png"
        />
      </ScrollView>
      <View style={styles.bottomWrapper}>
        <TouchableOpacity style={styles.tweetButton} onPress={() => navigation.navigate('MyModal')}>
          <Ionicons name="logo-twitter" size={32} color="white" />
        </TouchableOpacity>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tweetButton: {
    backgroundColor: '#20b2aa',
    height: 50,
    width: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomWrapper: {
    right: 20,
    bottom: 20,
    position: 'absolute',
  },
});
