import { Stack } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Step1() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View>
        <Text style={styles.container}>Step 1</Text>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    fontSize: 40,
    color: "#FFF",
  },
});
