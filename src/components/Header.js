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
