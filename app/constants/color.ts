// app/constants/colors.ts

export const COLORS = {
  // Wizscle Premium Colors
  wizscleBlack: "#000000",
  wizscleGrayDark: "#1a1a1a",
  wizscleGrayBorder: "#374151",
  wizscleGreenPrimary: "#4ADE80",
  wizscleGreenSecondary: "#22C55E",
  wizscleGreenEmerald: "#10B981",
  wizscleGreenLime: "#A3E635",
  wizscleWhite: "#FFFFFF",
  wizscleGrayLight: "#9CA3AF",

  // Standard Theme (aliases)
  background: "#000000",
  foreground: "#FFFFFF",
  card: "#1a1a1a",
  cardForeground: "#FFFFFF",
  primary: "#4ADE80",
  primaryForeground: "#000000",
  secondary: "#22C55E",
  secondaryForeground: "#000000",
  muted: "#1a1a1a",
  mutedForeground: "#9CA3AF",
  accent: "#10B981",
  accentForeground: "#000000",
  destructive: "#d4183d",
  destructiveForeground: "#ffffff",
  border: "#374151",
  input: "#1a1a1a",
  inputBackground: "#1a1a1a",
  switchBackground: "#374151",
  ring: "#4ADE80",
} as const;

export type ColorKey = keyof typeof COLORS;
