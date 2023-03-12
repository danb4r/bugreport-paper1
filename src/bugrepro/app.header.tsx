import { useState } from "react";
import { View, Linking } from "react-native";
import { Avatar, Divider, IconButton, Menu, Text } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";

declare type Props = {
  /** Show back button */
  back?: boolean;

  /** Show menu hamburger */
  menu?: boolean;
};

export const AppHeader = (props: Props) => {
  // FIXME fix why this auto closes on web

  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => {
    console.debug("openMenu fired..");
    setMenuVisible(true);
  };
  const closeMenu = () => {
    console.debug("closeMenu fired..");
    setMenuVisible(false);
  };

  return (
    <View style={{ flexDirection: "row", width: "100%" }}>
      <View style={{ flex: 1, padding: 8 }}>
        <Text style={{ fontWeight: "bold", color: "blue" }} variant="titleLarge">
          App Title
        </Text>
        <Text variant="bodySmall" style={{ color: "blue" }}>
          App Subtitle
        </Text>
      </View>
      <Menu
        visible={props.menu ? (menuVisible ? true : false) : false}
        onDismiss={closeMenu}
        anchor={<IconButton icon="menu" iconColor="red" onPress={openMenu} />}>
        <>
          <View
            style={[
              {
                paddingHorizontal: 10,
                paddingBottom: 5,
                paddingTop: 2,
                flexDirection: "row",
                alignItems: "center",
              },
            ]}>
            <>
              <Avatar.Icon size={40} icon="account-circle-outline" color="white" style={{ backgroundColor: "blue" }} />
              <View style={{ paddingHorizontal: 9 }} />
            </>
            <Text style={{ paddingHorizontal: 10, color: "Red" }}>User</Text>
          </View>
          <Divider style={{ marginTop: 8 }} />
          <Menu.Item
            onPress={() => {
              console.log("My subscription.. was pressed");
            }}
            title="My subscription"
            leadingIcon="seal"
            titleStyle={{ fontSize: 14, color: "grey" }}
          />
          <Menu.Item
            onPress={() => {
              console.log("How App works.. was pressed");
            }}
            title="How it works"
            leadingIcon="help"
            titleStyle={{ fontSize: 14, color: "grey" }}
          />
          <Divider style={{ marginTop: 8 }} />
          <View
            style={{
              paddingVertical: 10,
              paddingHorizontal: 20,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
              alignContent: "center",
            }}>
            <Text
              onPress={() => {
                Linking.openURL("https://" + "mywebsite");
              }}
              style={{
                color: "grey",
                fontSize: 14,
                textDecorationLine: "underline",
                paddingRight: 4,
              }}>
              Mywebsite..
            </Text>
            <Ionicons name="open-outline" size={12} color="grey" />
          </View>
          <Menu.Item
            onPress={() => {
              console.log("How Money Invest works.. was pressed");
            }}
            title="Some other item.."
            leadingIcon="help"
            titleStyle={{ fontSize: 14, color: "grey" }}
          />
        </>
      </Menu>
    </View>
  );
};
