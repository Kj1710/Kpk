import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const labelSizes = [
  { size: '57*70 mm', labels: 100 },
  { size: '57*40 mm', labels: 160 },
  { size: '57*30 mm', labels: 200 },
  { size: '57*20 mm', labels: 300 },
  { size: '57*10 mm', labels: 550 },
  { size: '50*50 mm', labels: 130 },
  { size: '40*70 mm', labels: 100 },
  { size: '40*60 mm', labels: 100 },
  { size: '40*40 mm', labels: 100 },
  { size: '40*30 mm', labels: 200 },
  { size: '40*20 mm', labels: 300 },
  { size: '30*40 mm', labels: 160 },
  { size: '30*50 mm', labels: 130 },
];

const NewLabel1 = () => {
  const navigation = useNavigation();

  const handleSizeSelection = (size) => {
    navigation.navigate('Page', { selectedSize: size });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Select Label Size</Text>
      {labelSizes.map(({ size }, index) => (
        <TouchableOpacity key={index} style={styles.sizeButton} onPress={() => handleSizeSelection(size)}>
          <Text style={styles.sizeButtonText}>{size}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 20,
    marginBottom: 20,
  },
  sizeButton: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  sizeButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default NewLabel1;
