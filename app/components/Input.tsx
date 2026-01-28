// app/components/Input.tsx
import { COLORS } from "../constants/color";
import { THEME } from "../constants/theme";
// app/components/Input.tsx
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
}

export default function Input({
  label,
  error,
  containerStyle,
  ...textInputProps
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          isFocused && styles.inputFocused,
          error && styles.inputError,
        ]}
        placeholderTextColor={COLORS.mutedForeground}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...textInputProps}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: THEME.spacing.md,
  },
  label: {
    color: COLORS.foreground,
    fontSize: THEME.fontSize.md,
    fontWeight: THEME.fontWeight.medium,
    lineHeight: THEME.lineHeight.loose,
    marginBottom: THEME.spacing.xs,
  },
  input: {
    backgroundColor: COLORS.inputBackground,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: THEME.borderRadius.md,
    padding: THEME.spacing.sm,
    color: COLORS.foreground,
    fontSize: THEME.fontSize.md,
    fontWeight: THEME.fontWeight.normal,
    lineHeight: THEME.lineHeight.loose,
    minHeight: 52,
  },
  inputFocused: {
    borderColor: COLORS.ring,
    borderWidth: 2,
    outlineWidth: 0,
  },
  inputError: {
    borderColor: COLORS.destructive,
  },
  errorText: {
    color: COLORS.destructive,
    fontSize: THEME.fontSize.sm,
    marginTop: THEME.spacing.xs,
  },
});
