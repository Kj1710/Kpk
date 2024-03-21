import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TextInput, Button, Dimensions } from "react-native";
import Draggable from "react-native-draggable";

const NewLabel2 = ({ route }) => {
  const { selectedSize } = route.params;
  const [widthStr, heightStr] = selectedSize.split("*");
  const width = parseInt(widthStr, 10);
  const height = parseInt(heightStr, 10);

  const [elements, setElements] = useState([]);
  const [zoomFactor, setZoomFactor] = useState(1);

  useEffect(() => {
    const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
    const marginPercentage = 0.05; // 5%
    const marginWidth = screenWidth * marginPercentage;
    const marginHeight = screenHeight * marginPercentage;

    const adjustedScreenWidth = screenWidth - marginWidth * 2;
    const adjustedScreenHeight = screenHeight - marginHeight * 2;

    const calculatedZoomFactor = Math.min(adjustedScreenWidth / width, adjustedScreenHeight / height);
    setZoomFactor(calculatedZoomFactor);
  }, []);

  // Check for invalid size format
  if (isNaN(width) || isNaN(height)) {
    return (
      <View style={styles.container}>
        <Text>Error: Invalid size format</Text>
      </View>
    );
  }

  const adjustedWidth = width * zoomFactor;
  const adjustedHeight = height * zoomFactor;

  const handleAddText = () => {
    const newTextElement = (
      <Draggable
        key={elements.length}
        x={adjustedWidth / 2}
        y={adjustedHeight / 2}
        minX={0}
        minY={0}
        maxX={adjustedWidth}
        maxY={adjustedHeight}
        style={styles.draggable}
      >
        <TextInput placeholder="Type here" style={styles.textInput} />
      </Draggable>
    );
    setElements([...elements, newTextElement]);
  };

  const handleAddQRCode = () => {
    const newQRCodeElement = (
      <Draggable
        key={elements.length}
        x={adjustedWidth / 2}
        y={adjustedHeight / 2}
        minX={0}
        minY={0}
        maxX={adjustedWidth}
        maxY={adjustedHeight}
        style={styles.draggable}
      >
        <Text>QR Code</Text>
      </Draggable>
    );
    setElements([...elements, newQRCodeElement]);
  };

  const handleAddBarcode = () => {
    const newBarcodeElement = (
      <Draggable
        key={elements.length}
        x={adjustedWidth / 2}
        y={adjustedHeight / 2}
        minX={0}
        minY={0}
        maxX={adjustedWidth}
        maxY={adjustedHeight}
        style={styles.draggable}
      >
        <Text>Barcode</Text>
      </Draggable>
    );
    setElements([...elements, newBarcodeElement]);
  };

  const handleReset = () => {
    setElements([]);
  };

  const handleSave = () => {
    // Logic to save label
    console.log("Label saved");
  };

  const handlePrint = () => {
    // Logic to print label
    console.log("Label printed");
  };

  return (
    <View style={styles.container}>
      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <Button title="Add Text" onPress={handleAddText} />
        <Button title="Add QR Code" onPress={handleAddQRCode} />
        <Button title="Add Barcode" onPress={handleAddBarcode} />
        <Button title="Reset" onPress={handleReset} />
      </View>
      {/* Whiteboard container */}
      <View style={[styles.whiteboardContainer, { width: adjustedWidth, height: adjustedHeight }]}>
        <View style={styles.whiteboard}>
          {elements.map((element, index) => (
            <React.Fragment key={index}>{element}</React.Fragment>
          ))}
        </View>
      </View>
      {/* Save and Print buttons */}
      <View style={styles.savePrintContainer}>
        <Button title="Save" onPress={handleSave} />
        <Button title="Print" onPress={handlePrint} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  heading: {
    fontSize: 20,
    marginBottom: 20,
  },
  whiteboardContainer: {
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 5,
    overflow: "hidden", // Ensure elements don't overflow the container
  },
  whiteboard: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  draggable: {
    position: "absolute",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "black",
    padding: 5,
    width: 150,
  },
  savePrintContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
});

export default NewLabel2;
