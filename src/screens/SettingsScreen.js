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
        <Button title="新規登録" disabled={!(nameValid && passValid)} onPress={buttonOnPress} />
      </Content>
    </Container>
  );
}
