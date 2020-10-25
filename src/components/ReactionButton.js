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
