import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { ThemedText } from "./ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";

const styles = StyleSheet.create({
  btnOutline: {
    marginBottom: 15,
    minHeight: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  btnOutlineText: {
    textAlign: "center",
    color: "#000",
  },
});

const SimpleButtonV2 = ({
  style,
  onPress,
  text,
  textColor,
  backgroundColor,
  icon,
  disabled,
  fontSize = 16,
  isSelected,
}: {
  style?: any;
  text?: string;
  onPress: () => void;
  textColor?: string;
  backgroundColor?: string;
  icon?: any;
  disabled?: boolean;
  fontSize?: number;
  isSelected?: boolean;
}) => {
  const bgColor =
    backgroundColor ||
    (isSelected ? Colors.button : useThemeColor({}, "button"));
  const txColor =
    textColor || (isSelected ? "#FFFFFF" : useThemeColor({}, "buttonText"));

  return (
    <TouchableOpacity
      activeOpacity={disabled ? 1 : 0}
      style={[
        styles.btnOutline,
        {
          backgroundColor: bgColor,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
      onPress={disabled ? null : onPress}
    >
      {icon}
      {text && (
        <ThemedText
          type="paragraph"
          style={[
            styles.btnOutlineText,
            {
              color: txColor,
              fontWeight: Boolean(icon) ? 400 : 600,
              marginLeft: Boolean(icon) ? 7 : 0,
              fontSize,
            },
          ]}
        >
          {text}
        </ThemedText>
      )}
    </TouchableOpacity>
  );
};

export default SimpleButtonV2;
