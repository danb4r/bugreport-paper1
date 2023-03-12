import { useState } from "react";
import { View, Pressable } from "react-native";
import { Subheading, Button, Portal, RadioButton } from "react-native-paper";
import { ModalTemplate } from "@src/features/components/modal.template";
import { useApp } from "@src/providers/app";
import { th, EThemeMode } from "@src/helpers/theme";
import { t } from "@src/helpers/i18n";

export const SettingsTheme = () => {
  const app = useApp();

  const [showModalThemeMode, setShowModalThemeMode] = useState(false);

  return (
    <>
      <Portal>
        <ModalTemplate
          visible={showModalThemeMode}
          onDismiss={() => setShowModalThemeMode(false)}
          headline={t("theme_choose_mode")}
          body={
            <View>
              <RadioButton.Group
                onValueChange={(newValue) => app.applyThemeMode(newValue as EThemeMode)}
                value={app.themeMode}>
                <RadioButton.Item
                  value="light"
                  label={t("theme_light")}
                  position="leading"
                  labelStyle={{ textAlign: "left", color: th.colors.theme_text_faded }}
                />
                <RadioButton.Item
                  value="dark"
                  label={t("theme_dark")}
                  position="leading"
                  labelStyle={{ textAlign: "left", color: th.colors.theme_text_faded }}
                />
                <RadioButton.Item
                  value="system"
                  label={t("theme_system")}
                  position="leading"
                  labelStyle={{ textAlign: "left", color: th.colors.theme_text_faded }}
                />
              </RadioButton.Group>
            </View>
          }
          footer={
            <Button uppercase={false} onPress={() => setShowModalThemeMode(false)}>
              <Subheading style={{ color: th.colors.theme_main }}>{t("app_dismiss")}</Subheading>
            </Button>
          }></ModalTemplate>
      </Portal>

      <View style={{ paddingHorizontal: 6, paddingVertical: 10 }}>
        <View style={{ flexDirection: "row", paddingHorizontal: 8 }}>
          <Pressable style={{ flex: 1, alignItems: "center" }} onPress={() => setShowModalThemeMode(true)}>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
              }}>
              <Subheading style={{ paddingRight: 20, color: th.colors.theme_text_faded }}>{t("theme_mode")}</Subheading>
              <View style={{ flexGrow: 1 }}>
                <Button compact mode="contained" onPress={() => setShowModalThemeMode(true)}>
                  <Subheading style={{ textTransform: "capitalize", color: th.colors.theme_text_faded }}>
                    {t("theme_".concat(app.themeMode.toString()))}
                  </Subheading>
                </Button>
              </View>
            </View>
          </Pressable>
        </View>
        <View style={{ paddingTop: 8 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Button
              compact
              color={th.colors.palette_tomato}
              onPress={() => app.applyThemeColor("tomato")}
              labelStyle={{ fontWeight: "bold", textDecorationLine: "underline" }}>
              Tomato
            </Button>
            <Button
              compact
              color={th.colors.palette_green}
              onPress={() => app.applyThemeColor("green")}
              labelStyle={{ fontWeight: "bold", textDecorationLine: "underline" }}>
              Green
            </Button>
            <Button
              compact
              color={th.colors.palette_blue}
              onPress={() => app.applyThemeColor("blue")}
              labelStyle={{ fontWeight: "bold", textDecorationLine: "underline" }}>
              Blue
            </Button>
            <Button
              compact
              color={th.colors.palette_papaya}
              onPress={() => app.applyThemeColor("papaya")}
              labelStyle={{ fontWeight: "bold", textDecorationLine: "underline" }}>
              Papaya
            </Button>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Button
              compact
              color={th.colors.palette_pink}
              onPress={() => app.applyThemeColor("pink")}
              labelStyle={{ fontWeight: "bold", textDecorationLine: "underline" }}>
              Pink
            </Button>
            <Button
              compact
              color={th.colors.palette_cyan}
              onPress={() => app.applyThemeColor("cyan")}
              labelStyle={{ fontWeight: "bold", textDecorationLine: "underline" }}>
              Cyan
            </Button>
            <Button
              compact
              color={th.colors.palette_salmon}
              onPress={() => app.applyThemeColor("salmon")}
              labelStyle={{ fontWeight: "bold", textDecorationLine: "underline" }}>
              Salmon
            </Button>
            <Button
              compact
              color={th.colors.palette_slate}
              onPress={() => app.applyThemeColor("slate")}
              labelStyle={{ fontWeight: "bold", textDecorationLine: "underline" }}>
              Slate
            </Button>
          </View>
        </View>
      </View>
    </>
  );
};
