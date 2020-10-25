import AsyncStorage from '@react-native-community/async-storage';
import { Container, Button, Text, CardItem, Thumbnail } from 'native-base';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

import Header from '../components/Header';
import useInput from '../utils/useInput';

// Tweet投稿
const postTweet = (data) => {
  return fetch('http://localhost:3000/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch(() => alert('メンテナンス中です。'));
};

export default function ModalScreen({ navigation }) {
  const validation = (input) => !!input;
  const [name, setName] = useState();
  const [id, setId] = useState();
  const [tweet, valid, onChange] = useInput(validation);
  const leftOnPress = () => {
    navigation.goBack();
  };

  useEffect(() => {
    (async () => {
      const result = await AsyncStorage.getItem('user');
      const user = JSON.parse(result);
      setName(user.name);
      setId(user.id);
    })();
  }, []);

  const tweetButton = (
    <Button small info rounded disabled={!valid}>
      <Text>ツイート</Text>
    </Button>
  );
  const tweetOnPress = () => {
    postTweet({ userId: id, content: tweet });
    navigation.goBack({ reload: true });
  };

  return (
    <Container>
      <Header
        title=""
        leftChildren={<Text>キャンセル</Text>}
        leftOnPress={leftOnPress}
        rightChildren={tweetButton}
        rightOnPress={tweetOnPress}
      />
      <CardItem>
        <View style={styles.leftWrapper}>
          <Thumbnail
            style={styles.thumbnail}
            source={{
              uri: `https://na.ui-avatars.com/api/?name=${name}?background=random`,
            }}
          />
          <View style={styles.dummyItem} autoFocus />
        </View>
        <View style={styles.body}>
          <TextInput
            value={tweet}
            onChangeText={onChange}
            style={styles.textArea}
            placeholder="今何してる?"
            autoFocus
            multiline
          />
        </View>
      </CardItem>
    </Container>
  );
}

const styles = StyleSheet.create({
  leftWrapper: {
    justifyContent: 'flex-start',
    flexDirection: 'column',
    marginRight: 10,
    flex: 1,
  },
  dummyItem: {
    flex: 30,
  },
  body: {
    flex: 8,
  },
  thumbnail: {
    width: 45,
    height: 45,
  },
  textArea: {
    paddingLeft: 0,
    fontSize: 15,
  },
});
