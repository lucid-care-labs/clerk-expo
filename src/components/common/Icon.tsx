import { Text } from "react-native";
import React from "react";
import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  Fontisto,
  Entypo,
  Foundation,
  Feather,
} from "@expo/vector-icons";

export enum IconType {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  Fontisto,
  Entypo,
  Foundation,
  Feather,
}

export interface IconProps {
  type: IconType;
  name: string;
  size?: number;
  color?: string;
  style?: any;
}

const iconMap = {
  [IconType.AntDesign]: AntDesign,
  [IconType.MaterialCommunityIcons]: MaterialCommunityIcons,
  [IconType.MaterialIcons]: MaterialIcons,
  [IconType.Ionicons]: Ionicons,
  [IconType.FontAwesome]: FontAwesome,
  [IconType.FontAwesome5]: FontAwesome5,
  [IconType.FontAwesome6]: FontAwesome6,
  [IconType.Entypo]: Entypo,
  [IconType.Fontisto]: Fontisto,
  [IconType.Foundation]: Foundation,
  [IconType.Feather]: Feather,
};

const Icon = ({
  type,
  name,
  style = {},
  size = 24,
  color = "#000",
}: IconProps) => {
  const IconComponent = iconMap[type];

  return IconComponent ? (
    <IconComponent name={name} size={size} color={color} style={style} />
  ) : (
    <Text>Icon type not found</Text>
  );
};

export default Icon;
