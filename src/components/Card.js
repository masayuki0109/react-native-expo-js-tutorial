import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Content, Card, CardItem, Thumbnail, Button, Body } from 'native-base';
import React from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
export default function CardImageExample({ userName, content, imageUrl }) {
  const tweetImage = imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />;
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
                <Button transparent>
                  <MaterialCommunityIcons name="comment-outline" size={24} color="black" />
                  <Text>4</Text>
                </Button>
                <Button transparent>
                  <MaterialCommunityIcons name="heart-outline" size={24} color="black" />
                  <Text>4</Text>
                </Button>
                <Button transparent>
                  <MaterialCommunityIcons name="twitter-retweet" size={24} color="black" />
                  <Text>4</Text>
                </Button>
                <Button transparent>
                  <MaterialCommunityIcons name="share" size={24} color="black" />
                  <Text>4</Text>
                </Button>
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
