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