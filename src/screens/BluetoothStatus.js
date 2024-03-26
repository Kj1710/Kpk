// BluetoothStatus.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BluetoothStatus = ({ bluetoothActive, printerConnected, printerName }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Bluetooth {bluetoothActive ? 'Active' : 'Not Active'}
      </Text>
      <Text style={styles.text}>
        {printerConnected
          ? `Printer connected: ${printerName}`
          : 'No printer connected'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
});

export default BluetoothStatus;
