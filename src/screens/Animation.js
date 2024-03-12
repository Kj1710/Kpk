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
        source={require("../../assets/Raisa.jpeg")}
      />
    </View>
  );
};

export default Animation;

const styles = StyleSheet.create({});