import { View } from "react-native";
import { Text } from "react-native-paper";

import { th } from "@src/helpers/theme";
import { t } from "@src/helpers/i18n";
import { ViewPort } from "@src/features/components/viewport";

import { SettingsTheme } from "@src/features/feat.settings/settings.theme";

export const SettingsTab = () => {
  return (
    <ViewPort>
      <View style={{ padding: 6 }}>
        <View style={{ paddingVertical: 6 }}>
          <Text style={{ color: th.colors.theme_main }}>{t("theme_mode_and_colors")}</Text>
        </View>
        <View style={{ paddingTop: 4, borderWidth: 0.5, borderRadius: 5, borderColor: th.colors.disabled }}>
          <SettingsTheme />
        </View>
      </View>
    </ViewPort>
  );
};
