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
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}></Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}></Text>
        </View>
      </View>
      <View style={styles.footer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    flexDirection: "column",
    paddingHorizontal: 32,
    paddingVertical: 60,
  },
  header: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: COLORS.foreground,
  },
  subtitle: {
    fontSize: 20,
    color: "#9CA3AF",
  },
  content: {},
  footer: {},
});
