import { Ionicons } from '@expo/vector-icons';
import { Container } from 'native-base';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Card from '../components/TweetCard';

// 画像読み込み
const getPosts = () => {
  return fetch('http://localhost:3000/posts?_expand=user')
    .then((res) => res.json())
    .catch(() => alert('メンテナンス中です。'));
};

export default function HomeScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  // マウント時にpost内容を読み込み
  useEffect(() => {
    loading();
  }, []);

  // このスクリーンがフォーカスされたときに発火するイベント
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loading();
    });
    return unsubscribe;
  }, [navigation]);

  const loading = async () => {
    setRefreshing(true);
    const posts = await getPosts();
    setRefreshing(false);
    setPosts(posts);
  };

  // 投稿を新しいもの順になるようにソート
  const discId = (a, b) => a > b;
  const tweets = posts
    ?.sort(discId)
    .map((post) => (
      <Card
        userName={post.user.name}
        content={post.content}
        imageUrl={post.imageUrl}
        key={post.id}
      />
    ));

  return (
    <Container>
      <ScrollView
        style={styles.container}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loading} />}>
        {tweets}
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
