import { View, Text } from "react-native";
import React from "react";
import Icon, { IconType } from "./Icon";
import { ThemedText } from "./ThemedText";

const ErrorBox = ({ errorMessage }: { errorMessage: string }) => {
  return (
    <View
      className="mt-4 p-4 bg-red-500 flex-row pr-10 opacity-90 w-[95%]"
      style={{ borderRadius: 10 }}
    >
      <Icon
        type={IconType.MaterialIcons}
        name="error"
        color="white"
        size={20}
      />
      <ThemedText className="ml-2 text-white" type="highlight">
        {errorMessage}
      </ThemedText>
    </View>
  );
};

export default ErrorBox;
