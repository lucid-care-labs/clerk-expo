import { StyleSheet } from "react-native";
import { Colors } from "./Colors";

export const defaultStyles = StyleSheet.create({
  input: {
    height: 46,
    borderWidth: 1,
    borderColor: "#ABABAB50",
    borderRadius: 8,
    padding: 10,
  },
  btn: {
    backgroundColor: Colors.button,
    height: 52,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  link: {
    color: Colors.tertiary,
  },
});
