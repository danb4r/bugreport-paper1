import { View } from "react-native";
import { AppHeader } from "./app.header";
import { ViewPort } from "./viewport";

declare type Props = {
  children: React.ReactNode;
};

export const Skeleton = (props: Props) => {
  return (
    <View style={{ flex: 1 }}>
      <AppHeader menu />
      <ViewPort>{props.children}</ViewPort>
    </View>
  );
};
