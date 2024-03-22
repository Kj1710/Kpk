import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TextInput, Button, Dimensions } from "react-native";
import Draggable from "react-native-draggable";
import QRCode from "react-native-qrcode-svg";
import Svg, { Rect } from "react-native-svg";
import { BluetoothEscposPrinter } from "react-native-bluetooth-escpos-printer";
import Page from "./Page";

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

  if (isNaN(width) || isNaN(height)) {
    return (
      <View style={styles.container}>
        <Text>Error: Invalid size format</Text>
      </View>
    );
  }

  const adjustedWidth = width * zoomFactor;
  const adjustedHeight = height * zoomFactor;

  const handleAddElement = (elementType) => {
    let newElement;
    switch (elementType) {
      case "text":
        newElement = (
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
        break;
      case "qrCode":
        newElement = (
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
            <QRCode value="Your QR Code Data" size={100} />
          </Draggable>
        );
        break;
      case "barcode":
        newElement = (
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
            <Svg height="100" width="200">
              <Rect x="0" y="0" width="200" height="100" fill="white" />
              <Rect x="10" y="10" width="180" height="80" fill="black" />
            </Svg>
          </Draggable>
        );
        break;
      default:
        return;
    }
    setElements([...elements, newElement]);
  };

  const handleReset = () => {
    setElements([]);
  };

  const handleSave = () => {
    // Logic to save label
    console.log("Label saved");
  };

  const handlePrintWhiteboardContent = async () => {
    try {
      const whiteboardContent = elements.map((element) => ({
        elementType: element.props.elementType,
        props: element.props,
      }));
      console.log("for k aake");

      for (const element of whiteboardContent) {
        console.log("for k aadar");
        if (element.elementType === "text") {
          console.log("text k aadar");
          await BluetoothEscposPrinter.printText(
            element.props.children,
            1,
            element.props.fontSize || 24,
            element.props.fontStyle || 0
          );
        } else if (element.elementType === "qrCode") {
          await BluetoothEscposPrinter.printQRCode(
            element.props.value,
            element.props.size || 100,
            element.props.errorCorrectionLevel || "L"
          );
        } else if (element.elementType === "barcode") {
          await BluetoothEscposPrinter.printerBarcode(
            "Barcode Data", // Placeholder data
            BluetoothEscposPrinter.BARCODE_TYPE.CODE128,
            element.props.width || 2,
            element.props.height || 100,
            BluetoothEscposPrinter.BARCODE_TEXT_POSITION.BELOW
          );
        }
      }

      console.log("Printing whiteboard content:", whiteboardContent);
    } catch (error) {
      console.error("Error printing whiteboard content:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <Button title="Add Text" onPress={() => handleAddElement("text")} />
        <Button title="Add QR Code" onPress={() => handleAddElement("qrCode")} />
        <Button title="Add Barcode" onPress={() => handleAddElement("barcode")} />
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
        <Button title="Print" onPress={handlePrintWhiteboardContent} />
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
  whiteboardContainer: {
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 5,
    overflow: "hidden",
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
