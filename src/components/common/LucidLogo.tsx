import { View, Text, Image } from "react-native";
import React from "react";
import { useThemeResource } from "@/hooks/useThemeResource";

const LucidLogo = ({ style }: { style?: any }) => {
  const logoSource = useThemeResource({}, "lucidLogo");
  const { width, height } = {
    width: style.width ?? 40,
    height: style.height ?? 27,
  };
  return (
    <Image
      source={logoSource}
      style={{
        resizeMode: "contain",
        ...style,
        zIndex: 2,
        width,
        height,
      }}
    />
  );
};

export default LucidLogo;
