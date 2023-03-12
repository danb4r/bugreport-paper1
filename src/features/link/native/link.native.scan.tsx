import { useState, useEffect } from "react";
import { View, useWindowDimensions } from "react-native";
import { Button, Text, Paragraph, Title, Avatar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { BarCodeScanningResult, Camera, CameraType, PermissionResponse } from "expo-camera";
import { BarCodeScanner } from "expo-barcode-scanner";

import { ioClient } from "@src/services/socket.io/socket.io.client.native";
import { ksGetItem, ksSetItem } from "@src/services/keystorage";

import { constants } from "@src/constants";
import { t } from "@src/helpers/i18n";
import { th } from "@src/helpers/theme";

import { ActivityIndicatorDefault } from "@src/features/components/activity.indicator.default";
import { TAuthPhone } from "@src/services/socket.io/auth.types";

export const LinkNativeScan = () => {
  const navigation = useNavigation();

  /** Get windows dimensions */
  const { width } = useWindowDimensions();
  const cameraDimension = Math.trunc(width * 0.8);

  /** Handle camera permission states */
  const [permission, requestPermission] = Camera.useCameraPermissions();

  /** Controls component state */
  type compStates =
    | "checking_permissions"
    | "can_ask_again"
    | "asking"
    | "cannot_ask_again"
    | "goto_settings"
    | "permission_granted"
    | "go_back";
  const [compState, setCompState] = useState<compStates>("checking_permissions");

  /**
   * If on "checking_permissions" state, update permission state
   */
  const updatePermissionState = () => {
    if (compState === "checking_permissions" && permission) {
      /** Check if permissions have changed */
      if (permission.granted) {
        /** Small delay for screen to render properly on slow devices */
        setTimeout(() => {
          setCompState("permission_granted");
        }, 300);
      } else if (permission.canAskAgain) setCompState("can_ask_again");
      else setCompState("cannot_ask_again");
    }
  };

  /** Handle go_back and go_settings request */
  useEffect(() => {
    if (compState === "go_back") {
      navigation.goBack();
    } else if (compState === "goto_settings") {
      navigation.navigate("AppPhoneSettings" as never);
    }
  });

  /** Update permission states after every render */
  useEffect(() => {
    updatePermissionState();
  });

  /** */
  useEffect(() => {
    /** If we can ask for permission, let's ask */
    if (compState === "can_ask_again") {
      /** Change state to "asking" */
      setCompState("asking");
      requestPermission().then((response: PermissionResponse | null) => {
        /** If null response or not granted, navigate back */
        if (response === null || response?.granted === false) {
          setCompState("go_back");
        } else {
          /** Permission granted, let's check */
          setCompState("checking_permissions");
          updatePermissionState();
        }
      });
    }
  });

  /** Code scanned state */
  const [codeScanned, setCodeScanned] = useState<null | string>(null);

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    if (type == constants.qrCodeType) {
      setCodeScanned(data);

      alert("Bar code scanned! TYPE: " + type + " DATA: " + data);
      // CONTINUE

      /** Try to restore auth credentials if existent */
      ksGetItem("link_auth").then((ksAuth: unknown) => {
        console.log("ks auth:", ksAuth);
        /** Restore ksAuth object */
        // TODO

        /** Fix a initial empty auth object to start with */
        let auth = ksAuth ? (ksAuth as TAuthPhone) : { agent: "phone", id: "", truth: "", pairs: [] };
        console.log("auth", auth);

        ioClient.linkNsp.getSocket(auth as TAuth, (authReturn: TAuth) => {
          // CONTINUE get auth return from server
          ksSetItem("link_auth", authReturn);
          console.log("/link authReturn:", authReturn);
        });
      });
    }
  };

  if (compState === "permission_granted") {
    /**
     * Permissions granted, show camera to scan QR codes
     */
    return (
      <View>
        <View style={{ alignItems: "center", padding: 15 }}>
          <Title>{t("link_a_device")}</Title>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}>
          {codeScanned ? (
            <View
              style={{
                width: cameraDimension,
                height: cameraDimension,
                backgroundColor: th.colors.primary,
                justifyContent: "center",
                alignItems: "center",
              }}>
              <Avatar.Icon icon="camera" size={200} color={th.colors.theme_main} />
            </View>
          ) : (
            <Camera
              type={CameraType.back}
              barCodeScannerSettings={{ barCodeTypes: [BarCodeScanner.Constants.BarCodeType.QR] }}
              style={{ width: cameraDimension, height: cameraDimension }}
              onBarCodeScanned={(scanningResult: BarCodeScanningResult) => handleBarCodeScanned(scanningResult)}
            />
          )}
        </View>
        <View style={{ alignItems: "center", paddingVertical: 10, paddingHorizontal: 35 }}>
          <Text style={{ textAlign: "center", color: th.colors.theme_text_faded }}>
            {t("app_go_to")} <Text style={{ textDecorationLine: "underline" }}>{t("app_web_url")}</Text>{" "}
            {t("link_native_intro1")}
          </Text>
        </View>
        {codeScanned && (
          <View style={{ paddingVertical: 15, flexDirection: "row", justifyContent: "center" }}>
            <Button
              mode="contained"
              color={th.colors.theme_main}
              labelStyle={{ paddingHorizontal: 20 }}
              onPress={() => setCodeScanned(null)}>
              {t("link_native_scan_again")}
            </Button>
          </View>
        )}
      </View>
    );
  } else if (compState === "cannot_ask_again") {
    /**
     * Permission to camera denied, offer to open settings
     */
    return (
      <View
        style={{
          paddingHorizontal: 20,
          paddingBottom: 20,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
        }}>
        <View style={{ paddingTop: 30, paddingBottom: 15 }}>
          <Avatar.Icon icon="account-cog-outline" size={100} color={th.colors.theme_main} />
        </View>
        <Title>{t("link_use_on_other_devices")}</Title>
        <Text style={{ color: th.colors.theme_text_faded, textAlign: "center", paddingBottom: 30 }}>
          {t("link_native_ask_scan_permission_again")}
        </Text>
        <View style={{ flexDirection: "row", paddingBottom: 30, alignItems: "center" }}>
          <Paragraph style={{ fontWeight: "bold" }}>{t("link_native_ask_scan_again_permissions")}</Paragraph>
          <Ionicons
            name="arrow-forward-outline"
            size={20}
            color={th.colors.theme_main}
            style={{ paddingHorizontal: 10 }}
          />
          <Paragraph style={{ fontWeight: "bold" }}>{t("link_native_ask_scan_again_camera")}</Paragraph>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Button
            mode="contained"
            color={th.colors.theme_main}
            labelStyle={{ paddingHorizontal: 20 }}
            onPress={() => {
              setCompState("goto_settings");
            }}>
            {t("app_open_app_settings")}
          </Button>
        </View>
      </View>
    );
  } else {
    /** All other states (checking_permissions, can_ask_again, etc), show the spinner */
    return <ActivityIndicatorDefault message={t("app_checking_permissions")} />;
  }
};
