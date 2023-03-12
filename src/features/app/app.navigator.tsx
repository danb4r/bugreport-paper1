import { ReactNode } from "react";
import { View, Dimensions } from "react-native";
import { Text } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import { AppHeader } from "@src/features/app/app.header";
import { LinkNative } from "@src/features/link/native/link.native";
import { LinkNativeScan } from "@src/features/link/native/link.native.scan";
import { AppPhoneSettings } from "@src/features/app/app.phone.settings";

import { SurvivalTab } from "@src/features/feat.survival/survival.tab";
import { RewardsTab } from "@src/features/feat.rewards/rewards.tab";
import { InvestmentsTab } from "@src/features/feat.investments/investments.tab";
import { SettingsTab } from "@src/features/feat.settings/settings.tab";

import { SurvivalAddOrEdit } from "@src/features/feat.survival/survival.add_or_edit";
import { SurvivalAccountManager } from "@src/features/feat.survival/survival.account.manager";

import { t } from "@src/helpers/i18n";
import { th } from "@src/helpers/theme";
import { constants } from "@src/features/app/constants";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const TAB_ICON = {
    SurvivalTab: ["cart", "cart-outline"],
    RewardsTab: ["trail-sign", "trail-sign-outline"],
    InvestmentsTab: ["stats-chart", "stats-chart-outline"],
    SettingsTab: ["settings", "settings-outline"],
    none: [],
  };

  const TAB_LABEL = {
    SurvivalTab: t("tab_survival"),
    RewardsTab: t("tab_rewards"),
    InvestmentsTab: t("tab_investments"),
    SettingsTab: t("tab_settings"),
  };

  const screenOptions = ({ route, navigation }: any) => {
    // @ts-ignore
    const iconName = TAB_ICON[route.name];
    // @ts-ignore
    const tabLabel = TAB_LABEL[route.name];

    return {
      tabBarShowLabel: false,
      tabBarIcon: ({ focused, color, size }: { focused: boolean; color: string; size: string }) => (
        <View
          style={{
            flexDirection: Dimensions.get("window").width < constants.viewPortThreshold ? "column" : "row",
            alignItems: "center",
            borderBottomWidth: focused ? 2 : 0,
            borderBottomColor: color,
            paddingBottom: 6,
          }}>
          <Ionicons name={iconName[focused ? 0 : 1]} size={Number(size)} color={color} />
          <Text
            style={{
              color: color,
              fontSize: 11,
              paddingHorizontal: Dimensions.get("window").width < 500 ? 0 : 20,
            }}>
            {tabLabel}
          </Text>
        </View>
      ),
      tabBarActiveTintColor: th.colors.theme_main,
      tabBarStyle: { height: 62, paddingBottom: 2, paddingTop: 6 }, // magic numbers: height: 62, paddingBottom: 2 | 6
      tabBarActiveStyle: {},
      header: (props: {}) => <AppHeader {...props} menu />,
    };
  };

  return (
    <Tab.Navigator screenOptions={screenOptions as never}>
      <Tab.Screen name="SurvivalTab" component={SurvivalTab} />
      <Tab.Screen name="RewardsTab" component={RewardsTab} />
      <Tab.Screen name="InvestmentsTab" component={InvestmentsTab} />
      <Tab.Screen name="SettingsTab" component={SettingsTab} />
    </Tab.Navigator>
  );
};

const Stack = createStackNavigator();

export const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="LinkNative" component={LinkNative} options={{ header: () => <AppHeader /> }} />
      <Stack.Screen name="LinkNativeScan" component={LinkNativeScan} options={{ header: () => <AppHeader /> }} />
      <Stack.Screen
        name="AppPhoneSettings"
        component={AppPhoneSettings}
        options={{ header: (props) => <AppHeader {...props} back={false} /> }}
      />
      <Stack.Screen
        name="SurvivalAddOrEdit"
        component={SurvivalAddOrEdit}
        options={{ header: (props) => <AppHeader {...props} back={false} /> }}
      />
      <Stack.Screen
        name="SurvivalAccountManager"
        component={SurvivalAccountManager}
        options={{ header: (props) => <AppHeader {...props} back={false} /> }}
      />
    </Stack.Navigator>
  );
};
