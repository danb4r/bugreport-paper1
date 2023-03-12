import { Image, Pressable, View } from "react-native";
import { Text } from "react-native-paper";

import { th } from "@src/helpers/theme";

type Props = {
  /** The sign in function to fire when button pressed */
  signIn: () => void;
};

export const GoogleLoginButton = (props: Props) => {
  return (
    <View style={{ paddingLeft: 5 }}>
      <Pressable
        onPress={() => {
          props.signIn();
        }}
        style={({ pressed }) => [
          { backgroundColor: pressed ? (th.dark ? "#72787c" : "#d2d2d2") : th.dark ? "#4285F4" : "white" },
        ]}>
        <View style={{ paddingLeft: 1 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingRight: 12,
              shadowColor: th.dark ? "#4285F4" : th.colors.theme_text_faded,
              shadowOffset: { width: 1, height: 1 },
              shadowRadius: 3,
            }}>
            <Image
              source={require("@src/features/auth.firebase/assets/logo_google.png")}
              style={{
                width: 20,
                height: 20,
                backgroundColor: "white",
                borderColor: "white",
                borderWidth: 8,
                padding: 8,
                borderRadius: 2,
                marginVertical: 1,
              }}
            />
            <Text
              style={{
                color: th.dark ? "white" : th.colors.theme_text_faded,
                fontWeight: "bold",
                letterSpacing: 0,
                paddingLeft: 10,
              }}
              selectable={false}>
              Sign in
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};
