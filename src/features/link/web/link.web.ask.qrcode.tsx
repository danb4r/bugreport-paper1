import { useState, useCallback } from "react";
import { View } from "react-native";
import { Text, Button } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import QRCode from "react-native-qrcode-svg";

import { getAuth } from "firebase/auth";

import { ioClient } from "@src/services/socket.io/socket.io.client.web";
import { th } from "@src/helpers/theme";
import { ActivityIndicatorDefault } from "@src/features/components/activity.indicator.default";

export const WebAskQRCode = () => {
  const [qrKey, setQrKey] = useState("");
  const [working, setWorking] = useState(false);

  const getQrKeyHandler = useCallback(() => {
    setWorking(true);
    getAuth()
      .currentUser?.getIdToken(true)
      .then((idToken) => {
        ioClient.linkNsp.createNewLink(idToken, (qrKey) => setQrKey(qrKey));
        setWorking(false);
      })
      .catch((error) => {
        setWorking(false);
      });
  }, []);

  if (working) return <ActivityIndicatorDefault />;
  else
    return (
      <View style={{ alignItems: "center" }}>
        <Text style={{ padding: 20 }}>Point your mobile Money App to the QR Code bellow to connect..</Text>
        <View style={{ flexDirection: "row" }}>
          {!qrKey && (
            <Button mode="outlined" onPress={getQrKeyHandler}>
              Get QR Code
            </Button>
          )}
          <View style={{ paddingRight: 10 }} />
          <Button mode="outlined" onPress={() => ioClient.disconnectAll()}>
            Disconnect
          </Button>
        </View>
        <View style={{ paddingVertical: 20 }} />
        <View style={{ padding: 20, backgroundColor: "white" }}>
          {qrKey ? (
            <QRCode value={qrKey} size={200} />
          ) : (
            <View>
              <Ionicons name="reload-outline" size={200} color={th.colors.theme_text_faded} />
            </View>
          )}
        </View>
        <Text style={{ padding: 20 }}>Got qrKey: {qrKey}</Text>
      </View>
    );
};
