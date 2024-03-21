import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { BluetoothEscposPrinter } from "react-native-bluetooth-escpos-printer";

const PrintQRCode = () => {
  const qrCodeData = "https://github.com/Kj1710";
  const qrCodeSize = 300;
  

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
