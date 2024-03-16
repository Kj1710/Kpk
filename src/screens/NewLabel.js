import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, PixelRatio } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';
import Barcode from 'react-native-barcode-builder';
import Draggable from "react-native-draggable";

const mmToDp = (mm) => {
  const ratio = PixelRatio.get();
  return mm * ratio / 25.4; // Convert mm to dp
};

const labelSizes = [
  { size: "57*70 mm", labels: 100 },
  { size: "57*40 mm", labels: 160 },
  { size: "57*30 mm", labels: 200 },
  { size: "57*20 mm", labels: 300 },
  { size: "57*10 mm", labels: 550 },
  { size: "50*50 mm", labels: 130 },
  { size: "40*70 mm", labels: 100 },
  { size: "40*60 mm", labels: 100 },
  { size: "40*40 mm", labels: 100 },
  { size: "40*30 mm", labels: 200 },
  { size: "40*20 mm", labels: 300 },
  { size: "30*40 mm", labels: 160 },
  { size: "30*50 mm", labels: 130 }
];

const NewLabel = () => {
  const [contentType, setContentType] = useState(null);
  const [sectionWidth, setSectionWidth] = useState(mmToDp(48)); // Convert mm to dp
  const [sectionHeight, setSectionHeight] = useState(mmToDp(30)); // Convert mm to dp
  const [selectedSize, setSelectedSize] = useState(labelSizes[0].size);

  const renderContent = () => {
    switch (contentType) {
      case 'QR Code':
        return <QRCode value="Your QR Code Data" size={100} />;
      case 'Barcode':
        return <Barcode value="Your Barcode Data" format="CODE128" width={300} height={100} />;
      default:
        return <View style={[styles.whiteScreen, { width: sectionWidth, height: sectionHeight }]}></View>;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionText}>Select Label Size</Text>
        <View style={styles.labelButtons}>
          {labelSizes.map(({ size, labels }, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.button, selectedSize === size && styles.selectedButton]}
              onPress={() => {
                setSelectedSize(size);
                const [width, height] = size.split('*').map(Number);
                setSectionWidth(mmToDp(width));
                setSectionHeight(mmToDp(height));
              }}
            >
              <Text style={styles.buttonText}>{size} - {labels} labels</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={[styles.section, styles.sectionEven]}>
        <Text style={styles.sectionText}>Second Section</Text>
        <Draggable
          renderShape='rectangle'
          onDragRelease={(event) => {
            setSectionWidth(event.nativeEvent.layout.width);
            setSectionHeight(event.nativeEvent.layout.height);
          }}
        >
          <View style={{ width: sectionWidth, height: sectionHeight, borderWidth: 1, borderColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
            {renderContent()}
          </View>
        </Draggable>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionText}>Third Section</Text>
        <View style={styles.buttonContainer}>
          <TextInput
            style={styles.textInput}
            value={Math.round(sectionWidth * 25.4 / PixelRatio.get()).toString()} // Convert dp to mm
            onChangeText={(text) => setSectionWidth(mmToDp(parseInt(text)))} // Convert mm to dp
          />
          <Text style={styles.dimensionText}>Width (mm):</Text>
          <TextInput
            style={styles.textInput}
            value={Math.round(sectionHeight * 25.4 / PixelRatio.get()).toString()} // Convert dp to mm
            onChangeText={(text) => setSectionHeight(mmToDp(parseInt(text)))} // Convert mm to dp
          />
          <Text style={styles.dimensionText}>Height (mm):</Text>
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={() => console.log("Save button pressed")}>
          <FontAwesome5 name="save" size={20} color="white" />
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => setContentType('QR Code')}>
          <FontAwesome5 name="qrcode" size={20} color="white" />
          <Text style={styles.buttonText}>QR Code</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setContentType('Barcode')}>
          <FontAwesome5 name="barcode" size={20} color="white" />
          <Text style={styles.buttonText}>Barcode</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => console.log("Reset button pressed")}>
          <FontAwesome5 name="undo" size={20} color="white" />
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  sectionEven: {
    backgroundColor: "#f9f9f9",
  },
  sectionText: {
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: 18,
  },
  labelButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#007bff",
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  selectedButton: {
    backgroundColor: "#0056b3",
  },
  buttonText: {
    color: "white",
    marginLeft: 5,
    fontSize: 16,
  },
  whiteScreen: {
    backgroundColor: "#fff",
  },
  textInput: {
    width: 80,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  dimensionText: {
    marginLeft: 10,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#007bff",
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: "center",
  },
});

export default NewLabel;
