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
import { BluetoothEscposPrinter } from "react-native-bluetooth-escpos-printer";
import Barcode from "@kichiyaki/react-native-barcode-generator";

const NewLabel2 = ({ route }) => {
  const { selectedSize } = route.params;
  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
  const [widthStr, heightStr] = selectedSize.split("*");
  const width = parseInt(widthStr, 10);
  const height = parseInt(heightStr, 10);
  const [elements, setElements] = useState([]);
  const [zoomFactor, setZoomFactor] = useState(1);
  const [textInputValue, setTextInputValue] = useState("");

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
            <TextInput
              placeholder="Type here"
              style={styles.textInput}
              onChangeText={(text) => setTextInputValue(text)}
            />
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
            "https://amzn.eu/d/dsg0rHS",
            props.size || 200,
            2
          );
        } else if (elementType === "barcode") {
          console.log("Printing Barcode Element");
          await BluetoothEscposPrinter.printBarCode(
            "123456789", 
            128,        
            3,           
            120,         
            0,           
            2            
          );
        } else if (elementType === "text") {
          console.log("Printing Text Element");

          await BluetoothEscposPrinter.printText(textInputValue, {
            encoding: "GBK",
            codepage: 0,
            widthtimes: 2,
            heigthtimes: 2,
            fonttype: 1,
          });
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
