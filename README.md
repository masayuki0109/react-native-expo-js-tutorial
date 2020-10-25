## STEP 1 ディレクトリー作成

コンポーネント用のディレクトリと・画面構成用のディレクトリを作成する
```
mkdir -p src/components src/screens
```

## 画面繊維のためのReact Navigationのインストール

```
npm install @react-navigation/native
expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
```

画面繊維のためのライブラリをインストール

```
npm install @react-navigation/stack
```

タブナビゲーション用のライブラリを追加
```
npm install @react-navigation/bottom-tabs
```

## タブのある画面を作る

試しに、２つのタブと画面を作成

### ./App.js
```javascript
import 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}
```


## 下から飛び出すモーダル画面を作る


```javascript
import 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator mode="modal">
        <RootStack.Screen name="Main" component={MainTabScreen} options={{ headerShown: false }} />
        <RootStack.Screen name="MyModal" component={ModalScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

function MainTabScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

function ModalScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Modal</Text>
    </View>
  );
}

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
      <Button title="open Modal" onPress={() => navigation.navigate('MyModal')} />
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

```

## Step2 それぞれのファイルに分割

### ホーム画面を作る

```sh
touch src/screens/HomeScreen.js
```

src/screens/HomeScreen.js 
```javascript
import React from 'react';
import { View, Button, Text } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
      <Button title="open Modal" onPress={() => navigation.navigate('MyModal')} />
    </View>
  );
}

````

### 設定画面を作る
```sh
touch src/screens/SettingsScreen.js
```

src/screens/SettingsScreen.js 
```javascript
import React from 'react';
import { View, Text } from 'react-native';

export default function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings</Text>
    </View>
  );
}
````


### タブスタックのコンポーネントを作る
```sh
touch src/screens/MainTabScreen.js
```

src/screens/MainTabScreen.js 
```javascript
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import { HomeScreen } from './HomeScreen';
import { SettingsScreen } from './SettingsScreen';
const Tab = createBottomTabNavigator();

export const MainTabScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

```

### モーダルスクリーンを作る
```sh
touch src/screens/ModalScreen.js
```

src/screens/ModalScreen.js 
```javascript
import React from 'react';
import { View, Text } from 'react-native';

export default function ModalScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Modal</Text>
    </View>
  );
}

```

## step3 アイコンを使おう

expoのデフォルトのアイコンを使います。詳しくは↓
[Icons \- Expo Documentation](https://docs.expo.io/guides/icons/)
アイコンの検索をする時はこちら↓
[@expo/vector\-icons directory](https://icons.expo.fyi/)

### タブバーにアイコンを追加する

src/screens/MainTabScreen.js

```js
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import HomeScreen from './HomeScreen';
import SettingsScreen from './SettingsScreen';
const Tab = createBottomTabNavigator();

export default function MainTabScreen() {
  const screenOptions = ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName = 'md-home';
      if (route.name === 'Settings') iconName = 'md-settings';

      return <Ionicons name={iconName} size={size} color={color} />;
    },
  });

  return (
    <Tab.Navigator
      screenOptions={screenOptions}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
```

モーダルを表示するボタンをアイコンにする

```javascript
//src/screens/HomeScreen.js

import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
      <TouchableOpacity style={styles.tweetButton} onPress={() => navigation.navigate('MyModal')}>
        <Ionicons name="logo-twitter" size={32} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tweetButton: {
    backgroundColor: '#20b2aa',
    height: 50,
    width: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

```

## Step4 NativeBaseの導入

少し、らくするために、React NaitiveのBootstrap的存在のNativeBaseを使います。
[Components · NativeBase](https://docs.nativebase.io/Components.html#Components)

```sh
npm install native-base
```

tweetを表示するためのCardコンポーネントを作成します。

```sh
touch src/components/Card.js 
```

```javascript

// src/components/TweetCard.js
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Content, Card, CardItem, Thumbnail, Button, Body } from 'native-base';
import React from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
export default function TweetCard({ userName, content, imageUrl }) {
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

```

Home画面で、作成したtweetを表示するためにCardコンポーネントを追加します。

```javascript
import { Ionicons } from '@expo/vector-icons';
import { Container } from 'native-base';
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Card from '../components/Card';

export default function HomeScreen({ navigation }) {
  return (
    <Container>
      <ScrollView style={styles.container}>
        <Card
          userName="Masayuki Yamaji"
          content="ここに文章が入ります。"
          imageUrl="https://reactjs.org/logo-og.png"
        />
        <Card
          userName="Masayuki Yamaji"
          content="ここに文章が入ります。"
          imageUrl="https://reactjs.org/logo-og.png"
        />
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

```


## Step5 リアクションのボタンをコンポーネント化

類似する機能を持つコンポーネントをまとめる

```sh
touch src/components/ReactionButton.js   
```

```js
// src/components/ReactionButton.js   

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button } from 'native-base';
import React from 'react';
import { Text } from 'react-native';

export default function ReactionButton({ iconName, reactionCount, onPress }) {
  const count = reactionCount > 0 && <Text>{reactionCount}</Text>;
  return (
    <Button transparent onPress={onPress}>
      <MaterialCommunityIcons name={iconName} size={24} color="black" />
      {count}
    </Button>
  );
}

```

呼び出し側も変更

ここでは、一旦、ハートのボタンを押すと、押された回数だけカウントアップするように変更しています。
(時間に余裕があれば、カスタムフックの説明)

expoのシェア機能を使って、他のアプリへシャアできるようにします。

```javascript
//src/components/TweetCard.js


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

```


## Step6 モックサーバーを用意する

フロント・バックエンド完全分業のシチュエーションを想定して（バンクエンド作る余裕ありませんでした。ごめんなさい）
server-jsonをインストールします。

```sh
npm install -g json-server
mkdir server
touch server/db.json
```
30秒くらいで、json形式の簡易apiサーバーが作れます。自分でゴリゴリAPIを開発しない時はすごく役立ちます。
詳しくはこちらを↓。

[typicode/json\-server: Get a full fake REST API with zero coding in less than 30 seconds \(seriously\)](https://github.com/typicode/json-server)


dbとなる、ダミーjsonを作成します。
```json
{
  "posts": [
    { "id": 1, "userId" :1, "content": "初めてのツイートだよ" },
    { "id": 2, "userId" :2, "content": "画像アリのツイートだよ", "imageUrl": "https://reactjs.org/logo-og.png"},
    { "id": 3, "userId" :2, "content": "長めのツイートだよ長めのツイートだよ長めのツイートだよ長めのツイートだよ\n 改行を含むよ" },
    { "id": 4, "userId" :4, "content": "長めのツイートだよ" },
    { "id": 5, "userId" :5, "content": "長めのツイートだよ" }
  ],
  "users": [
    {"id": 1, "name": "山田　太郎" },
    {"id": 2, "name": "山田　花子" },
    {"id": 3, "name": "ツイート 史太郎" },
    {"id": 4, "name": "コメント 史太郎" },
    {"id": 5, "name": "リツート 史太郎" },
    {"id": 5, "name": "クソリプ 史太郎" }
  ]
}

```

3000ポートで立ち上げます。

```sh
json-server --watch server/db.json
```

ダミーデータを使うように、HomeScreenを編集 


```javascript

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

  const loading = async () => {
    setRefreshing(true);
    const posts = await getPosts();
    setRefreshing(false);
    setPosts(posts);
  };

  const tweets = posts?.map((post) => (
    <Card userName={post.user.name} content={post.content} imageUrl={post.imageUrl} key={post.id} />
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

```

## Step7 ユーザーの作成


設定ページのヘッダーを作成

```sh
touch src/components/Header.js
```

```javascript
// src/components/Header.js

import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Title } from 'native-base';
export default class HeaderTitleExample extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Left/>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right />
        </Header>
      </Container>
    );
  }
}
```

ボタンコンポーネントを作成
```sh
touch src/components/Button.js
```

```javascript
// src/components/Button.js

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
    marginBottom: 350,
  },
  wrapper: {
    width: '80%',
  },
});

```

### データの永続化

ユーザー情報をアプリ終了後も保持できるように永続化
```sh
expo install @react-native-community/async-storage
```

### ユーザー名を入力できるように修正

```javascript

// src/screens/SettingsScreen.js
import AsyncStorage from '@react-native-community/async-storage';
import { Container, Content, Form, Item, Input, Label } from 'native-base';
import React, { useEffect } from 'react';

import Button from '../components/Button';
import Header from '../components/Header';
import useInput from '../utils/useInput';

// user登録
const postUser = (data) => {
  return fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch(() => alert('メンテナンス中です。'));
};

export default function SettingsScreen() {
  // 空文字でなければ、OKとする
  const validation = (input) => !!input;
  const [name, nameValid, onChangeName] = useInput(validation);
  const [pass, passValid, onChangePass] = useInput(validation);

  const buttonOnPress = async () => {
    const result = await postUser({ name });
    // ユーザー名の永続化
    await AsyncStorage.setItem('user', JSON.stringify(result));
  };

  useEffect(() => {
    (async () => {
      const result = await AsyncStorage.getItem('user');
      const user = JSON.parse(result);
      onChangeName(user.name);
    })();
  }, []);

  return (
    <Container>
      <Header title="設定" />
      <Content scrollEnabled={false}>
        <Form>
          <Item fixedLabel>
            <Label>Username</Label>
            <Input value={name} onChangeText={onChangeName} />
          </Item>
          <Item fixedLabel last>
            <Label>Password</Label>
            <Input value={pass} onChangeText={onChangePass} />
          </Item>
        </Form>
      </Content>
      <Button title="新規登録" disabled={!(nameValid && passValid)} onPress={buttonOnPress} />
    </Container>
  );
}
```

テキストフォームのカスタムフック

```sh
mkdir src/utils
touch src/utils/useInput.js
```

```javascript

// src/utils/useInput.js
import { useState } from 'react';

export default function useInput(validation) {
  const [input, setInput] = useState();
  const [valid, setValid] = useState(false);
  const onChange = (input) => {
    setInput(input);
    setValid(validation(input));
  };
  return [input, valid, onChange];
}

```

## Step8 ツイートの投稿

Headerに左右のボタンを表示できるように修正

```javascript
// src/components/Header.js
import { Header as NBHeader, Left, Body, Right, Title } from 'native-base';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
export default function Header({ title, leftChildren, leftOnPress, rightChildren, rightOnPress }) {
  const leftButton = !!leftChildren && (
    <Left>
      <TouchableOpacity onPress={leftOnPress}>{leftChildren}</TouchableOpacity>
    </Left>
  );

  const rightButton = !!rightChildren && (
    <Right>
      <TouchableOpacity onPress={rightOnPress}>{rightChildren}</TouchableOpacity>
    </Right>
  );
  return (
    <NBHeader>
      {leftButton}
      <Body>
        <Title>{title}</Title>
      </Body>
      {rightButton}
    </NBHeader>
  );
}

```

Navigationによるデフォルトのヘッダーを非表示

```javascript
// App.js
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import MainTabScreen from './src/screens/MainTabScreen';
import ModalScreen from './src/screens/ModalScreen';

const RootStack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="Main" component={MainTabScreen} options={{ headerShown: false }} />
        <RootStack.Screen name="MyModal" component={ModalScreen} options={{}} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
```

モーダルスクリーンを変更

```javascript
// src/screens/ModalScreen.js

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

```

ホームスクリーンで、tweetの昇降順を変更
スクリーンがフォーカスされたときに、更新するように


```javascript
// src/screens/HomeScreen.js

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

```