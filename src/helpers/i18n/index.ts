import { I18n } from "i18n-js";

/** The key-value pairs for the different languages supported */
const translations = {
  en: {
    site_url: "moneyyei.com",
    app_web_url: "app.moneyyei.com",

    app_title: "Money Invest",
    app_subtitle: "Your money, properly organized",

    app_ok: "Ok",
    app_cancel: "Cancel",
    app_continue: "Continue",
    app_dismiss: "Dismiss",
    app_add: "Add",
    app_go_to: "Go to",
    app_reload: "Reload",
    app_checking_permissions: "Checking permissions..",
    app_open_app_settings: "Open settings",

    auth_welcome_message: "Money Invest will make it fun and easy to manage your money towards your life goals.",
    auth_welcome_auth_message: "Please, sign-in to keep your data safe.",
    auth_welcome_terms: "Terms, Conditions and Privacy Policy",
    auth_error_firebase_not_loaded:
      "Oh no!.. Somehow Firebase could not be loaded. Under normal conditions, this should not happen. Please, try to reload the app or close it and open it again.",

    theme_mode_and_colors: "Theme mode and colors",
    theme_mode: "Theme mode",
    theme_light: "Light theme",
    theme_dark: "Dark theme",
    theme_system: "System default",
    theme_choose_mode: "Choose theme mode",

    error_network: "Could not proceed. Do we have network access? Please try again.",
    error_auth: "Authentication failed. Please, try to sign-in again.",

    signin_successful: "Sign-in successful.",
    signin_canceled: "Sign-in canceled.",
    signin_error: "For some reason it was not possible to sign-in right now. Please, try again in a few seconds.",

    header_linked_devices: "Linked devices",
    header_my_subscription: "My subscription",
    header_how: "How Money Invest works",
    header_sign_out: "Sign out",
    header_disconnect_phone: "Disconnect from phone",

    link_a_device: "Link a device",
    link_use_on_other_devices: "Use Money Invest on other devices",
    link_native_explain_scan_permission:
      "We will ask for phone camera permissions to read QR codes to link your devices.",
    link_native_intro1: "in your desktop, laptop or tablet, and scan the QR code shown there to connect.",
    link_native_scan_again: "Scan again",
    link_native_ask_scan_permission_again:
      "We will need to open phone settings now for you to manually enable camera permission. Please open settings and then click on:",
    link_native_ask_scan_again_permissions: "Permissions",
    link_native_ask_scan_again_camera: "Camera",

    link_web_restore_previous: "Trying to restore previous link..",

    tab_survival: "Survival",
    tab_rewards: "Rewards",
    tab_investments: "Investments",
    tab_settings: "Settings",

    survival_item_add: "Add a survival item",
    survival_item_edit: "Edit a survival item",
    survival_income: "Income",
    survival_expense: "Expense",

    survival_account_select: "Select account",
    survival_account_manage: "Manage accounts",
    survival_account_manage_all: "Manage survival accounts",
    survival_account_add_new: "Add a new account",
    survival_new_account_name: "New account name",
  },
  ja: { app_name: "Money Invest", app_subtitle: "あなたのお金を美しく整理" },
};

const i18n = new I18n(translations);
i18n.defaultLocale = "en";

/** When a value is missing from a language it'll fallback to another language with the key present. */
i18n.enableFallback = true;

const t = (key: string) => {
  return i18n.t(key);
};

export { i18n, t };
