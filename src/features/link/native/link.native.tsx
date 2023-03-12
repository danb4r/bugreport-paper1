import { useState, useEffect } from "react";
import { View } from "react-native";
import { Avatar, Button, Text, Title } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import { Camera } from "expo-camera";

import { t } from "@src/helpers/i18n";
import { th } from "@src/helpers/theme";
import { AppEventListener } from "@src/helpers/app.listener";

export const LinkNative = () => {
  const navigation = useNavigation();

  const [showPermissionBanner, setShowPermissionBanner] = useState(false);

  const checkCameraPermissions = () => {
    Camera.getCameraPermissionsAsync().then((response) => {
      setShowPermissionBanner(!response?.granted);
    });
  };

  const [appEventListener, setAppEventListener] = useState<AppEventListener>();

  /** Listen to AppState background return */
  useEffect(() => {
    setAppEventListener(
      new AppEventListener("active", () => {
        checkCameraPermissions();
      })
    );
    return appEventListener?.finalize();
  }, []);

  useEffect(() => {
    checkCameraPermissions();
  });

  return (
    <View>
      <View
        style={{
          paddingHorizontal: 20,
          paddingBottom: 20,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
        }}>
        <View style={{ paddingTop: 30, paddingBottom: 15 }}>
          <Avatar.Icon icon="cellphone-link" size={100} color={th.colors.theme_main} />
        </View>
        <Title>{t("link_use_on_other_devices")}</Title>
        {showPermissionBanner && (
          <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 20 }}>
            <Avatar.Icon
              icon="security"
              size={50}
              color={th.colors.theme_main}
              style={{ backgroundColor: th.colors.surface }}
            />
            <Text style={{ color: th.colors.theme_text_faded, textAlign: "left", paddingVertical: 10, fontSize: 13 }}>
              {t("link_native_explain_scan_permission")}
            </Text>
          </View>
        )}
        <View style={{ flexDirection: "row", paddingTop: 20 }}>
          <Button
            mode="contained"
            color={th.colors.theme_main}
            onPress={() => {
              navigation.navigate("LinkNativeScan" as never);
            }}
            labelStyle={{ paddingHorizontal: 20 }}>
            {t("link_a_device")}
          </Button>
        </View>
      </View>
    </View>
  );
};
