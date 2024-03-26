import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'; // Import Dimensions
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
    navigation.navigate('NewLabel2', { selectedSize: size });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Select Label Size</Text>
      {/* Wrap buttons in a View to display them in two columns */}
      <View style={styles.buttonsContainer}>
        {labelSizes.map(({ size }, index) => (
          <TouchableOpacity key={index} style={styles.sizeButton} onPress={() => handleSizeSelection(size)}>
            <Text style={styles.sizeButtonText}>{size}</Text>
          </TouchableOpacity>
        ))}
      </View>
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
  buttonsContainer: {
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'center',
  },
  sizeButton: {
    width: Dimensions.get('window').width / 2 - 20,
    padding: 10,
    marginBottom: 10,
    marginRight: 10, 
    backgroundColor: 'orange',
    borderRadius: 5,
  },
  sizeButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center', // Center the text inside the button
  },
});

export default NewLabel1;
