import { useEffect } from "react";
import { getAuth, getRedirectResult } from "firebase/auth";
import { ActivityIndicatorDefault } from "@src/features/components/activity.indicator.default";

declare type Props = {
  callbackChecked: () => void;
};

export const CheckGoogleWebReturn = (props: Props) => {
  useEffect(() => {
    /** Firebase web authentication handler */
    const auth = getAuth();
    try {
      getRedirectResult(auth).then(() => {
        props.callbackChecked();
      });
    } catch (error) {
      /** //  TODO Is there a way to test this? */
      console.error("Google web return error.");
    }
  });

  return <ActivityIndicatorDefault />;
};
