import { useEffect } from "react";

/** Localization imports */
import { i18n } from "@src/helpers/i18n";
import * as Localization from "expo-localization";
import { ksGetItem, ksSetItem } from "@src/services/keystorage";

/**
 * Set locale at startup based on previous choice or environment info
 */
export function useLocale(onChangeCallback: () => void) {
  useEffect(() => {
    // DEBUG i18n.onChange(() => { console.log("I18n has changed! I18n version: " + i18n.version.toString() + " and locale: " + i18n.locale); });
    try {
      ksGetItem("i18n.locale").then((value: unknown) => {
        if (value != null) i18n.locale = value.toString();
        else {
          i18n.locale = Localization.getLocales()[0].languageTag.toLocaleLowerCase().replace("-", "_");
          ksSetItem("i18n.locale", i18n.locale);
        }
        onChangeCallback();
      });
    } catch (error) {
      i18n.locale = Localization.getLocales()[0].languageTag.toLocaleLowerCase().replace("-", "_");
      /** Calling onChangeCallback() again here would start an infinite loop in case KeyStorage is failing to set or get items */
    }
  }, []);
}
