import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { BluetoothEscposPrinter } from "react-native-bluetooth-escpos-printer";

const PrintQRCode = () => {
  const qrCodeData = "Your QR Code Data";
  const qrCodeSize = 200; // Adjust size as needed
  // Error correction level

  const printQRCode = async () => {
    try {
      await BluetoothEscposPrinter.printQRCode(qrCodeData, qrCodeSize, 2);
    } catch (e) {
      console.log(e.message || "ERROR");
    }
  };

  return (
    <View>
      <Text>Sample Print Instruction</Text>
      <View style={styles.btn}>
        <Button title="Print QR Code" onPress={printQRCode} />
      </View>
    </View>
  );
};

export default PrintQRCode;

const styles = StyleSheet.create({
  btn: {
    marginBottom: 8,
  },
});
