import { Header as NBHeader, Left, Body, Right, Title } from 'native-base';
import React from 'react';
export default function Header({ title }) {
  return (
    <NBHeader>
      <Left />
      <Body>
        <Title>{title}</Title>
      </Body>
      <Right />
    </NBHeader>
  );
}
