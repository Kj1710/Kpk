import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  Dimensions,
  TextInput,
} from "react-native";
import Draggable from "react-native-draggable";
import QRCode from "react-native-qrcode-svg";
import ViewShot from "react-native-view-shot";
import { BluetoothTscPrinter } from "react-native-bluetooth-escpos-printer";
import Barcode from "@kichiyaki/react-native-barcode-generator";

const NewLabel2 = ({ route }) => {
  const { selectedSize } = route.params;
  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
  const [widthStr, heightStr] = selectedSize.split("*");
  const width = parseInt(widthStr, 10);
  const height = parseInt(heightStr, 10);
  const [elements, setElements] = useState([]);
  const [zoomFactor, setZoomFactor] = useState(1);
  const viewShotRef = useRef(null); // Reference to the ViewShot component

  useEffect(() => {
    const marginPercentage = 0.05;
    const marginWidth = screenWidth * marginPercentage;
    const marginHeight = screenHeight * marginPercentage;

    const adjustedScreenWidth = screenWidth - marginWidth * 2;
    const adjustedScreenHeight = screenHeight - marginHeight * 2;

    const calculatedZoomFactor = Math.min(
      adjustedScreenWidth / width,
      adjustedScreenHeight / height
    );
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
    const defaultX = adjustedWidth / 2;
    const defaultY = adjustedHeight / 2;
    let newElement;

    switch (elementType) {
      case "text":
        newElement = (
          <Draggable
            key={elements.length}
            x={defaultX}
            y={defaultY}
            minX={0}
            minY={0}
            maxX={adjustedWidth}
            maxY={adjustedHeight}
            style={styles.draggable}
            elementType="text"
          >
            <TextInput placeholder="Type here" style={styles.textInput} />
          </Draggable>
        );
        break;
      case "qrCode":
        newElement = (
          <Draggable
            key={elements.length}
            x={defaultX}
            y={defaultY}
            minX={0}
            minY={0}
            maxX={adjustedWidth}
            maxY={adjustedHeight}
            style={styles.draggable}
            elementType="qrCode"
          >
            <QRCode value="Your QR Code Data" size={100} />
          </Draggable>
        );
        break;
      case "barcode":
        newElement = (
          <Draggable
            key={elements.length}
            x={defaultX}
            y={defaultY}
            minX={0}
            minY={0}
            maxX={adjustedWidth}
            maxY={adjustedHeight}
            style={styles.draggable}
            elementType="barcode"
          >
            <Barcode
              value="123456789"
              format="CODE128"
              width={1.5}
              height={50}
              lineColor="black"
              background="white"
            />
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
    console.log("Label saved");
  };

  const handlePrintWhiteboardContent = async () => {
    try {
      if (viewShotRef.current) {
        viewShotRef.current.capture().then(async (uri) => {
          console.log("Image captured:", uri);
          // Pass the image URI to the printer for printing
          await BluetoothTscPrinter.printLabel({
            image: uri,
            width: adjustedWidth, // Pass the adjusted width
            height: adjustedHeight, // Pass the adjusted height
          });
        });
      } else {
        console.error("viewShotRef.current is null");
      }
    } catch (error) {
      console.error("Error printing whiteboard content:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <Button title="Add Text" onPress={() => handleAddElement("text")} />
        <Button
          title="Add QR Code"
          onPress={() => handleAddElement("qrCode")}
        />
        <Button
          title="Add Barcode"
          onPress={() => handleAddElement("barcode")}
        />
        <Button title="Reset" onPress={handleReset} />
      </View>
      {/* Whiteboard container */}
      <View style={styles.whiteboardContainer}>
        <ViewShot
          ref={viewShotRef}
          options={{ format: "jpg", quality: 0.9 }}
          style={{ width: adjustedWidth, height: adjustedHeight }}
        >
          <View style={styles.whiteboard}>
            {elements.map((element, index) => (
              <React.Fragment key={index}>{element}</React.Fragment>
            ))}
          </View>
        </ViewShot>
      </View>
      {/* Save and Print buttons */}
      <View style={styles.savePrintContainer}>
        <Button title="Save" onPress={handleSave} />
        <Button
          title="Print"
          onPress={handlePrintWhiteboardContent}
          disabled={!viewShotRef.current}
        />
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
