import {StyleSheet, Text, View, Image, StatusBar} from 'react-native';
import React, {useEffect} from 'react';

const Animation = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Register');
    }, 2000);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <StatusBar hidden />
      <Image
        style={{height: 250, width: '100%', resizeMode: 'contain'}}
        source={{
          uri: 'https://imgs.search.brave.com/v0oPMXxqTFlZdnuU9zRHQNQXCJ7_Ogu-dmGgl3LjlIU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4u/dmVjdG9yc3RvY2su/Y29tL2kvcHJldmll/dy0xeC8xMS82My9r/cGstbG9nby1sZXR0/ZXItbGV0dGVyLWxv/Z28tZGVzaWduLXZl/Y3Rvci00MjYzMTE2/My5qcGc',
        }}
      />
    </View>
  );
};

export default Animation;

const styles = StyleSheet.create({});