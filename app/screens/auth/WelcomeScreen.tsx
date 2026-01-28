import { COLORS } from "@/app/constants/color";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>WIZSCLE</Text>
        <Text style={styles.subtitle}>Your Ai Fitness</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.tagline}>Transformez votre corps</Text>
        <Text style={styles.description}>Programme personnalisé par IA</Text>
        <Text style={styles.description}>Nutrition + Entraînement</Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Commencer</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonSecondary}>
          <Text style={styles.buttonTextSecondary}>J'ai déjà un compte</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#4ADE80",
    letterSpacing: 2,
    textShadowColor: "#4ADE80",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  subtitle: {
    color: "#9CA3AF",
    fontSize: 16,
    marginTop: 8,
  },
  content: {
    flex: 3,
    paddingHorizontal: 32,
    justifyContent: "center",
  },
  tagline: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 16,
  },
  description: {
    fontSize: 18,
    color: "#9CA3AF",
    textAlign: "center",
    marginBottom: 8,
  },
  footer: {
    flex: 2,
    paddingHorizontal: 32,
    paddingBottom: 48,
    justifyContent: "flex-end",
  },
  button: {
    backgroundColor: "#4ADE80",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonSecondary: {
    backgroundColor: "transparent",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#4ADE80",
  },
  buttonTextSecondary: {
    color: "#4ADE80",
    fontSize: 18,
    fontWeight: "bold",
  },
});
