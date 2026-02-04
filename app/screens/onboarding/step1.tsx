import { COLORS } from "@/app/constants/color";
import { Text } from "@react-navigation/elements";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function Step1() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Disponibilité</Text>
        <Text style={styles.subtitle}>Planifons vos entraînements</Text>
      </View>
      <View style={styles.content}></View>
      <View style={styles.footer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flex: 1,
    marginTop: 90,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 20,
    color: "#9CA3AF",
  },
  content: {},
  footer: {},
});
