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
