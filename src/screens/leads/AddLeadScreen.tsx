import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, Paragraph } from 'react-native-paper';

const AddLeadScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Title>Add Lead</Title>
      <Paragraph>This screen is under construction.</Paragraph>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddLeadScreen;