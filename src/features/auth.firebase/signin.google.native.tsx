import { useContext, useEffect } from "react";

import auth from "@react-native-firebase/auth";
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";

import { AuthContext } from "@src/features/auth.firebase/auth.context.native";
import { ActivityIndicatorDefault } from "@src/features/components/activity.indicator.default";

export const SignInGoogle = () => {
  const authContext = useContext(AuthContext);

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
      authContext.signInComplete();
    } catch (error) {
      /** Report back error or cancel */
      // @ts-ignore
      if (error.code == statusCodes.SIGN_IN_CANCELLED) {
        authContext.signInCancel();
      } else {
        authContext.signInOutError();
        console.error("MONEY: SigninGoogle (1): ", error);
      }

      /** Let's try to revert to previous state */
      try {
        GoogleSignin.signOut();
      } catch (error) {
        console.error("MONEY: SigninGoogle (2): ", error);
      }
    }
  };

  useEffect(() => {
    googleSignin();
  });

  return <ActivityIndicatorDefault />;
};
