import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Dimensions,
} from "react-native";
import Draggable from "react-native-draggable";
import QRCode from "react-native-qrcode-svg";
import Svg, { Rect } from "react-native-svg";
import { BluetoothEscposPrinter } from "react-native-bluetooth-escpos-printer";
import Barcode from "@kichiyaki/react-native-barcode-generator";

const NewLabel2 = ({ route }) => {
  const { selectedSize } = route.params;
  const [widthStr, heightStr] = selectedSize.split("*");
  const width = parseInt(widthStr, 10);
  const height = parseInt(heightStr, 10);
  const [barcodeValue, setBarcodeValue] = useState("");
  const [elements, setElements] = useState([]);
  const [zoomFactor, setZoomFactor] = useState(1);

  useEffect(() => {
    const { width: screenWidth, height: screenHeight } =
      Dimensions.get("window");
    const marginPercentage = 0.05; // 5%
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
  const BARCODE_TYPE = BluetoothEscposPrinter.BARCODE_TYPE;

  const adjustedWidth = width * zoomFactor;
  const adjustedHeight = height * zoomFactor;

  const handleAddElement = (elementType) => {
    let newElement;
    const defaultX = adjustedWidth / 2;
    const defaultY = adjustedHeight / 2;

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
        setElements([...elements, newElement]);
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
        setElements([...elements, newElement]);
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
      for (const element of elements) {
        const elementType = element.props.elementType;
        const props = element.props;

        if (!elementType) {
          console.warn("Skipping element with undefined elementType:", element);
          continue;
        }

        if (elementType === "qrCode") {
          console.log("Printing QR code element");
          await BluetoothEscposPrinter.printQRCode(
            "Your QR Code Data",
            props.size || 100,
            2
          );
        } else if (elementType === "barcode") {
          console.log("Printing Barcode Element");
          await BluetoothEscposPrinter.printBarCode(
            "Barcode Data",
            128,
            3,
            120,
            0,
            2
          );
        } else if (elementType === "text") {
          console.log("Printing Text Element");
          await BluetoothEscposPrinter.printText(
            props.children,
            1,
            props.fontSize || 24,
            props.fontStyle || 0
          );
        } else {
          console.warn("Unsupported element type:", elementType);
        }
      }

      console.log("Printing whiteboard content:", elements);
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
      <View
        style={[
          styles.whiteboardContainer,
          { width: adjustedWidth, height: adjustedHeight },
        ]}
      >
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
