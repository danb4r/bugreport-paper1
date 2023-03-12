import { useEffect } from "react";
import { getAuth, getRedirectResult } from "firebase/auth";
import { ActivityIndicatorDefault } from "@src/features/components/activity.indicator.default";

declare type Props = {
  callbackChecked: () => void;
  callbackError: () => void;
};

export const AuthCheckGoogleWebReturn = (props: Props) => {
  useEffect(() => {
    /** Firebase web authentication handler */
    const auth = getAuth();
    try {
      getRedirectResult(auth).then(() => {
        props.callbackChecked();
      });
    } catch (error) {
      props.callbackError();
    }
  });

  return <ActivityIndicatorDefault />;
};
