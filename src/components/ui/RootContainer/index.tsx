import React from 'react';
import {StyleSheet, View} from 'react-native';

interface RootParams {
  children?: React.ReactNode;
  style?: Object;
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

function RootContainer({children, style}: RootParams) {
  return <View style={[styles.root, style]}>{children}</View>;
}

export default RootContainer;
