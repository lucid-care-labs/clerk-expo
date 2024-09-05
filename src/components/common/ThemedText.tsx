import { Text, type TextProps, StyleSheet } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?:
    | "default"
    | "title"
    | "defaultSemiBold"
    | "subtitle"
    | "subtitleMd"
    | "link"
    | "sectionTitle"
    | "paragraph"
    | "highlight"
    | "large"
    | "question"
    | "tag"
    | "button";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <Text
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "subtitleMd" ? styles.subtitleMd : undefined,
        type === "link" ? styles.link : undefined,
        type === "sectionTitle" ? styles.sectionTitle : undefined,
        type === "paragraph" ? styles.paragraph : undefined,
        type === "highlight" ? styles.highlight : undefined,
        type === "large" ? styles.large : undefined,
        type === "question" ? styles.question : undefined,
        type === "tag" ? styles.tag : undefined,
        type === "button" ? styles.button : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 14,
    lineHeight: 28,
  },
  defaultSemiBold: {
    fontSize: 14,
    lineHeight: 28,
    fontWeight: "600",
  },
  tag: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "600",
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 20,
  },
  highlight: {
    fontSize: 17,
    lineHeight: 20,
  },
  large: {
    fontSize: 32,
    fontWeight: "bold",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitleMd: {
    fontSize: 20,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
  link: {
    lineHeight: 28,
    fontSize: 14,
    color: "#0a7ea4",
  },
  button: {
    fontSize: 17,
    fontWeight: "bold",
    color: Colors.button,
  },
  question: {
    fontSize: 24,
    fontWeight: "bold",
    lineHeight: 24,
  },
});
