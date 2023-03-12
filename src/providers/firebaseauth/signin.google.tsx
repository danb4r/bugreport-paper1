import { useEffect } from "react";

import { getAuth, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";

import { ActivityIndicatorDefault } from "@src/features/components/activity.indicator.default";

export enum ESignInResponseCodes {
  success,
  cancel,
  error,
}

/** Props not used on web, but used on native. Ignore here. */
declare type Props = {
  callback?: (code: ESignInResponseCodes) => void;
};

export const SignInGoogle = (props: Props) => {
  useEffect(() => {
    const auth = getAuth();

    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  });

  return <ActivityIndicatorDefault />;
};
