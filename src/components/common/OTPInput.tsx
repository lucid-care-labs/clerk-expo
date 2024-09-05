import { View, TextInput } from "react-native";
import React, { useRef } from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import { defaultStyles } from "@/constants/Styles";

const OTPInput = ({
  style = {},
  value,
  setValue,
  length = 6,
}: {
  style?: any;
  value: string[];
  setValue: (value: string[]) => void;
  length?: number;
}) => {
  const textColor = useThemeColor({}, "text");
  const boxColor = useThemeColor({}, "box");
  const inputs = useRef([]);

  const handleChangeText = (text: string, index: number) => {
    const newValue = [...value];
    newValue[index] = text;

    // Update the state with the new value
    setValue(newValue);

    // Move focus to the next input if the text is filled and it's not the last input
    if (text.length === 1 && index < length - 1) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyPress = ({ nativeEvent }) => {
    if (nativeEvent.key === "Backspace") {
      const activeIndex = inputs.current.findIndex((input) =>
        input.isFocused()
      );
      if (activeIndex > 0) {
        inputs.current[activeIndex - 1].focus();
      }
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        ...style,
      }}
    >
      {[...Array(length)].map((_, index) => (
        <TextInput
          key={index}
          ref={(el) => (inputs.current[index] = el)}
          style={[
            defaultStyles.input,
            {
              width: 50,
              height: 50,
              borderBottomWidth: 0.3,
              borderColor: "#00000040",
              textAlign: "center",
              fontSize: 18,
              margin: 5,
              color: textColor,
              backgroundColor: boxColor,
            },
          ]}
          maxLength={1}
          keyboardType="numeric"
          onChangeText={(text) => handleChangeText(text, index)}
          onKeyPress={handleKeyPress}
        />
      ))}
    </View>
  );
};

export default OTPInput;
