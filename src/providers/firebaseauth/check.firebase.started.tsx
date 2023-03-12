import { useEffect, useState } from "react";
import { getApps } from "firebase/app";

import { ActivityIndicatorDefault } from "@src/features/components/activity.indicator.default";
import { ErrorAction } from "@src/features/components/error.action";

import { useReload } from "@src/providers/reload";
import { t } from "@src/helpers/i18n";

declare type Props = {
  callbackChecked: () => void;
};

export function CheckFirebaseStarted(props: Props) {
  const [firebaseFailed, setFirebaseFailed] = useState(false);

  const reload = useReload();
  const doReload = () => {
    reload.doReload();
  };

  useEffect(() => {
    /** Handle Firebase laziness
     * Check for an existing application over a 10 seconds period */
    let counter = 0;
    const checkFirebaseStarted = () => {
      setTimeout(() => {
        if (getApps().length < 1 && counter < 50) {
          /** Firebase has not started yet, let's try again */
          counter++;
          checkFirebaseStarted();
        } else {
          /** Firebase started or time is up */
          if (getApps().length >= 1) props.callbackChecked();
          else setFirebaseFailed(true);
        }
      }, 200);
    };
    checkFirebaseStarted();
  }, []);

  if (firebaseFailed)
    return <ErrorAction icon="reload" buttonOnPress={doReload} message={t("auth_error_firebase_not_loaded")} />;
  else return <ActivityIndicatorDefault />;
}
