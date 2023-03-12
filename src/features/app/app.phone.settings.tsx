import { useState, useEffect } from "react";
import { Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Camera } from "expo-camera";

import { ActivityIndicatorDefault } from "@src/features/components/activity.indicator.default";
import { AppEventListener } from "@src/helpers/app.listener";

import { t } from "@src/helpers/i18n";

export const AppPhoneSettings = () => {
  const navigation = useNavigation();

  const [navigateBack, setNavigateBack] = useState(false);

  useEffect(() => {
    if (navigateBack) navigation.navigate("LinkNative" as never);
  });

  /** Listen to AppState background return from settings */
  const [appEventListener, setAppEventListener] = useState<AppEventListener>();
  useEffect(() => {
    setAppEventListener(
      new AppEventListener("active", () => {
        Camera.getCameraPermissionsAsync().then((response) => {
          setNavigateBack(true);
        });
        // }
      })
    );
    return () => {
      appEventListener?.finalize();
    };
  }, []);

  /** Open app phone settings */
  useEffect(() => {
    Linking.openSettings();
  }, []);

  return <ActivityIndicatorDefault message={t("app_checking_permissions")} />;
};
