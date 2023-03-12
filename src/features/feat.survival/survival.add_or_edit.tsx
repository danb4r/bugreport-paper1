import { useState } from "react";
import { View } from "react-native";
import { Portal, Button, Headline, Subheading, List, RadioButton } from "react-native-paper";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { ModalTemplate } from "@src/features/components/modal.template";
import { ViewPort } from "@src/features/components/viewport";

import { t } from "@src/helpers/i18n";
import { th } from "@src/helpers/theme";

// TODO FIX THIS EXPORT.. used on survival.tab.tsx
export interface ISurvivalProps {
  entry: {
    name: string;
  };
}

enum entryType {
  income = 0,
  expense = 1,
}

enum accounts {
  a = "Bank debit",
  b = "Credit",
}

export const SurvivalAddOrEdit = ({ route }: any) => {
  const navigation = useNavigation();

  /** controls screen focus */
  const [screenIsFocused, setScreenIsFocused] = useState(true);
  useFocusEffect(() => {
    setScreenIsFocused(true);
    return () => setScreenIsFocused(false);
  });

  const props: ISurvivalProps | null = route?.params;

  const [selectedEntryType, setSelectedEntryType] = useState(entryType.expense);

  const [selectedAccount, setSelectedAccount] = useState(accounts.a);
  const [showModalAccount, setShowModalAccount] = useState(false);

  // FIXME
  // <View>
  //   <Text>Survival: {props?.entry.name}</Text>
  // </View>;

  return (
    <>
      {/** The modal to select or edit Accounts */}
      <Portal>
        <ModalTemplate
          visible={showModalAccount && screenIsFocused}
          onDismiss={() => setShowModalAccount(false)}
          headline={t("survival_account_select")}
          body={
            <RadioButton.Group
              onValueChange={(newValue) => {
                setSelectedAccount(newValue as accounts);
                setShowModalAccount(false);
              }}
              value={selectedAccount}>
              <RadioButton.Item
                value={accounts.a}
                label={accounts.a}
                position="leading"
                labelStyle={{ textAlign: "left", color: th.colors.theme_text_faded }}
              />
              <RadioButton.Item
                value={accounts.b}
                label={accounts.b}
                position="leading"
                labelStyle={{ textAlign: "left", color: th.colors.theme_text_faded }}
              />
            </RadioButton.Group>
          }
          footer={
            <>
              <Button uppercase={false} onPress={() => setShowModalAccount(false)}>
                <Subheading style={{ color: th.colors.theme_main }}>{t("app_dismiss")}</Subheading>
              </Button>
              <Button uppercase={false} onPress={() => navigation.navigate("SurvivalAccountManager" as never)}>
                <Subheading style={{ color: th.colors.theme_main }}>{t("survival_account_manage")}</Subheading>
              </Button>
            </>
          }
        />
      </Portal>
      {/*
       The overlay to add or edit an Entry
       */}
      <ViewPort>
        <View style={{ padding: 6, width: "100%", alignSelf: "center" }}>
          <View style={{ flexDirection: "row", alignItems: "center", paddingBottom: 10, paddingHorizontal: 6 }}>
            <Ionicons size={30} name="cart-outline" color={th.colors.theme_main} />
            <Headline style={{ color: th.colors.theme_text_faded, padding: 6 }}>
              {props?.entry ? t("survival_item_edit") : t("survival_item_add")}
            </Headline>
          </View>
          <View
            style={{
              paddingVertical: 10,
              marginHorizontal: 10,
              flexDirection: "row",
              justifyContent: "space-around",
              borderWidth: 0.3,
              borderRadius: 5,
              borderColor: "gray",
            }}>
            <Button
              mode={selectedEntryType === entryType.income ? "contained" : "outlined"}
              onPress={() => setSelectedEntryType(entryType.income)}
              icon="plus-thick"
              color={selectedEntryType === entryType.income ? th.colors.palette_blue : th.colors.theme_text_faded}>
              {t("survival_income")}
            </Button>
            <Button
              mode={selectedEntryType === entryType.expense ? "contained" : "outlined"}
              onPress={() => setSelectedEntryType(entryType.expense)}
              icon="minus-thick"
              color={selectedEntryType === entryType.expense ? th.colors.palette_tomato : th.colors.theme_text_faded}>
              {t("survival_expense")}
            </Button>
          </View>
          <View>
            <List.Accordion
              title={selectedAccount}
              left={(props) => <List.Icon {...props} icon="cards-outline" />}
              onPress={() => setShowModalAccount(true)}
              expanded={false}
              titleStyle={{ color: th.colors.theme_text_faded }}>
              <></>
            </List.Accordion>
          </View>
          <View style={{ paddingTop: 20, flexDirection: "row", justifyContent: "space-evenly" }}>
            <Button uppercase={false} onPress={() => navigation.goBack()}>
              <Subheading style={{ color: th.colors.theme_main }}>{t("app_dismiss")}</Subheading>
            </Button>
          </View>
        </View>
      </ViewPort>
    </>
  );
};
