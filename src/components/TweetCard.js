import { Content, Card, CardItem, Thumbnail, Body } from 'native-base';
import React, { useState } from 'react';
import { Image, StyleSheet, View, Text, Share } from 'react-native';

import ReactionButton from './ReactionButton';
export default function TweetCard({ userName, content, imageUrl }) {
  const tweetImage = imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />;

  const [count, setCount] = useState(0);
  const heartOnPress = () => {
    setCount((count) => count + 1);
  };

  // tweetの内容をシェアする
  const onShare = async (userName, content, imageUrl) => {
    const url = imageUrl ? imageUrl : '';
    try {
      await Share.share({
        message: `${userName} | ${content} ${url}`,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <Content>
        <Card>
          <CardItem>
            <View style={styles.leftWrapper}>
              <Thumbnail
                style={styles.thumbnail}
                source={{
                  uri: `https://na.ui-avatars.com/api/?name=${userName}?background=random`,
                }}
              />
              <View style={styles.dummyItem} />
            </View>
            <View style={styles.body}>
              {/* このあたりは未完成なので、後ほど修正 */}
              <Body>
                <Text style={styles.userName}>{userName}</Text>
                <Text>{content.replace(/\s\s/g, '\n')}</Text>
                {tweetImage}
              </Body>
              <View style={styles.reactionButtons}>
                <ReactionButton iconName="comment-outline" />
                <ReactionButton
                  iconName="heart-outline"
                  reactionCount={count}
                  onPress={heartOnPress}
                />
                <ReactionButton iconName="twitter-retweet" />
                <ReactionButton
                  iconName="share"
                  onPress={() => onShare(userName, content, imageUrl)}
                />
              </View>
            </View>
          </CardItem>
        </Card>
      </Content>
    </>
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
  userName: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  body: {
    flex: 8,
  },
  thumbnail: {
    width: 45,
    height: 45,
  },
  image: {
    marginTop: 10,
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  icon: {
    margin: 0,
  },
  reactionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
