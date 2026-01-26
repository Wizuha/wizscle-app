// app/components/Card.tsx
import React, { ReactNode } from "react";
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import { COLORS } from "../constants/color";
import { THEME } from "../constants/theme";

interface CardProps {
  children: ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  variant?: "default" | "outlined";
}

export default function Card({
  children,
  style,
  onPress,
  variant = "default",
}: CardProps) {
  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container
      style={[
        styles.card,
        variant === "outlined" && styles.cardOutlined,
        style,
      ]}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      {children}
    </Container>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.backgroundSecondary,
    borderRadius: THEME.borderRadius.lg,
    padding: THEME.spacing.md,
    ...THEME.shadow.sm,
  },
  cardOutlined: {
    borderWidth: 1,
    borderColor: COLORS.border,
  },
});
