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
          uri: 'https://imgs.search.brave.com/TrVP65xB6EBuztA8xchQP9AoyNRJTjSUUu06RivgjU4/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzg0LzM4LzY3/LzM2MF9GXzI4NDM4/Njc0NF85dnRPdHhz/STVqOHZKM1VEeURN/R3djcHBSOVA5RFlL/Qy5qcGc',
        }}
      />
    </View>
  );
};

export default Animation;

const styles = StyleSheet.create({});