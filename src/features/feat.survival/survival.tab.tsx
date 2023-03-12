import { View } from "react-native";
import { Text, FAB } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import { th } from "@src/helpers/theme";
import { ViewPort } from "@src/features/components/viewport";

export const SurvivalTab = () => {
  const navigation = useNavigation();

  // FIXME onPress={() => navigation.navigate("SurvivalItem", { entry: { name: "Geacomeli" } } as ISurvivalProps)}
  return (
    <ViewPort>
      <FAB
        icon="plus"
        small
        style={{ position: "absolute", margin: 25, right: 0, bottom: 0, backgroundColor: th.colors.theme_main }}
        onPress={() => navigation.navigate("SurvivalAddOrEdit" as never)}
      />
      <View>
        <Text variant="bodyMedium">Here goes the list of survival entries..</Text>
      </View>
    </ViewPort>
  );
};
