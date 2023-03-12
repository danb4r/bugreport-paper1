import { useEffect } from "react";

import auth from "@react-native-firebase/auth";
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";

import { signOutGoogle } from "./signout.google.native";

import { ActivityIndicatorDefault } from "@src/features/components/activity.indicator.default";

export enum ESignInResponseCodes {
  success,
  cancel,
  error,
}

declare type Props = {
  callback: (code: ESignInResponseCodes) => void;
};

export const SignInGoogle = (props: Props) => {
  const googleSignin = async () => {
    try {
      /** Check if device supports Google Play */
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

      /** Get user's ID token */
      const { idToken } = await GoogleSignin.signIn();

      /** Create a Google credential with the token */
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      /** Now sign-in to Firebase */
      const signinResult = await auth().signInWithCredential(googleCredential);

      /** Updates the upper component */
      props.callback(ESignInResponseCodes.success);
    } catch (error) {
      /** Report back error or cancel */
      // @ts-ignore
      if (error.code == statusCodes.SIGN_IN_CANCELLED) {
        props.callback(ESignInResponseCodes.cancel);
      } else {
        props.callback(ESignInResponseCodes.error);
      }

      /** Got error, sign out for cleanness */
      await signOutGoogle();
    }
  };

  useEffect(() => {
    googleSignin();
  });

  return <ActivityIndicatorDefault />;
};
