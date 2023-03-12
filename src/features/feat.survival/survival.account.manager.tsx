import { useState, useRef, RefAttributes } from "react";
import { View } from "react-native";
import { Headline, TextInput, Button, Subheading, Portal, Snackbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { ModalTemplate } from "@src/features/components/modal.template";
import { ViewPort } from "@src/features/components/viewport";

import { t } from "@src/helpers/i18n";
import { th } from "@src/helpers/theme";

import { addSurvivalAccount } from "@src/models/survival/add.account";

export const SurvivalAccountManager = () => {
  const navigation = useNavigation();

  const [showAddAccountModal, setShowAddAccountModal] = useState(false);

  /** Snack logic */
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const showSnack = (message: string) => {
    setSnackMessage(message);
    setShowSnackbar(true);
  };
  const hideSnack = () => {
    setShowSnackbar(false);
    setSnackMessage("");
  };

  const [newAccountName, setNewAccountName] = useState("");
  const addAccountName = async (accountName: string) => {
    // FIXME set wait signal...
    const result = await addSurvivalAccount(accountName);
    console.info("Add result: " + result);
    // if (result == addSurvivalAccountResults.existent) showSnack("Account name already exists");
    showSnack("Result: " + result.toString());
  };
  const accountTextInputRef = useRef();

  const submitNewAccount = () => {
    try {
      // @ts-ignore
      accountTextInputRef.current?.blur();
    } catch {}
    addAccountName(newAccountName);
  };

  return (
    <>
      <Portal>
        <ModalTemplate
          visible={showAddAccountModal}
          headline={t("survival_account_add_new")}
          body={
            <TextInput
              ref={accountTextInputRef}
              label={t("survival_new_account_name")}
              dense
              value={newAccountName}
              onChangeText={(text) => setNewAccountName(text)}
              onSubmitEditing={() => submitNewAccount()}
            />
          }
          footer={
            <>
              <Button compact uppercase={false} onPress={() => setShowAddAccountModal(false)}>
                <Subheading style={{ color: th.colors.theme_main }}>{t("app_dismiss")}</Subheading>
              </Button>
              <Button
                compact
                uppercase={false}
                onPress={() => submitNewAccount()}
                contentStyle={{ paddingHorizontal: 10 }}>
                <Subheading style={{ color: th.colors.theme_main }}>{t("app_add")}</Subheading>
              </Button>
            </>
          }
          onDismiss={() => setShowAddAccountModal(false)}
        />
      </Portal>
      <ViewPort>
        <View style={{ padding: 6 }}>
          <View style={{ flexDirection: "row", alignItems: "center", paddingBottom: 10, paddingHorizontal: 6 }}>
            <Ionicons size={30} name="cart-outline" color={th.colors.theme_main} />
            <Headline style={{ color: th.colors.theme_text_faded, padding: 6 }}>
              {t("survival_account_manage_all")}
            </Headline>
          </View>
          <View style={{ paddingHorizontal: 10, paddingBottom: 10 }}>
            <Button compact mode="contained" uppercase={false} onPress={() => setShowAddAccountModal(true)}>
              <Subheading style={{ color: th.colors.theme_text_faded }}>{t("survival_account_add_new")}</Subheading>
            </Button>
          </View>
          <View style={{ paddingBottom: 10, flexDirection: "row", justifyContent: "space-evenly" }}>
            <Button uppercase={false} onPress={() => navigation.goBack()}>
              <Subheading style={{ color: th.colors.theme_main }}>{t("app_dismiss")}</Subheading>
            </Button>
          </View>
        </View>
      </ViewPort>
      <SnackbarAutoHide visible={showSnackbar}>{snackMessage}</SnackbarAutoHide>
    </>
  );
};
