import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';

const SizeWhiteboard = ({ size, zoomFactor }) => {
  const adjustedWidth = size.width * zoomFactor;
  const adjustedHeight = size.height * zoomFactor;

  return (
    <View style={[styles.whiteboard, { width: adjustedWidth, height: adjustedHeight }]}>
      <Text style={styles.whiteboardText}>{size.label}</Text>
    </View>
  );
};

const NewLabel2 = () => {
  const route = useRoute();
  const { selectedSize } = route.params;

  const [widthStr, heightStr] = selectedSize.split('*');
  const width = parseInt(widthStr, 10);
  const height = parseInt(heightStr, 10);

  if (isNaN(width) || isNaN(height)) {
    return (
      <View style={styles.container}>
        <Text>Error: Invalid size format</Text>
      </View>
    );
  }

  const zoomFactor = 7; 

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Selected Label Size (mm)</Text>
      <SizeWhiteboard size={{ width, height, label: `${width}mm * ${height}mm` }} zoomFactor={zoomFactor} />
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
  whiteboard: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  whiteboardText: {
    fontSize: 18,
  },
});

export default NewLabel2;
