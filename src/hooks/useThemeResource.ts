import { Resources } from "@/constants/Resources";
import { useColorScheme } from "react-native";

export const useThemeResource = (
  props: { light?: string; dark?: string },
  resourceName: keyof typeof Resources.light & keyof typeof Resources.dark
) => {
  const theme = useColorScheme() ?? "light";
  const resourceFromProps = props[theme];

  if (resourceFromProps) {
    return resourceFromProps;
  } else {
    return Resources[theme][resourceName];
  }
};
