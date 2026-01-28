// app/components/Button.tsx
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { COLORS } from "../constants/color";
import { THEME } from "../constants/theme";
interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "destructive";
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function Button({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  loading = false,
  style,
  textStyle,
}: ButtonProps) {
  const getButtonStyle = () => {
    switch (variant) {
      case "secondary":
        return styles.buttonSecondary;
      case "destructive":
        return styles.buttonDestructive;
      default:
        return styles.buttonPrimary;
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case "secondary":
        return styles.textSecondary;
      case "destructive":
        return styles.textDestructive;
      default:
        return styles.textPrimary;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getButtonStyle(),
        disabled && styles.buttonDisabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          color={
            variant === "primary" ? COLORS.primaryForeground : COLORS.primary
          }
        />
      ) : (
        <Text
          style={[
            styles.text,
            getTextStyle(),
            disabled && styles.textDisabled,
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: THEME.spacing.sm,
    paddingHorizontal: THEME.spacing.lg,
    borderRadius: THEME.borderRadius.lg,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 56,
  },
  buttonPrimary: {
    backgroundColor: COLORS.primary,
  },
  buttonSecondary: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  buttonDestructive: {
    backgroundColor: COLORS.destructive,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: THEME.fontSize.lg,
    fontWeight: THEME.fontWeight.medium,
    lineHeight: THEME.lineHeight.loose,
  },
  textPrimary: {
    color: COLORS.primaryForeground,
  },
  textSecondary: {
    color: COLORS.primary,
  },
  textDestructive: {
    color: COLORS.destructiveForeground,
  },
  textDisabled: {
    opacity: 0.6,
  },
});
