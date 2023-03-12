import { useState } from "react";

/** Init Firebase only once (web and native) */
import "@src/services/firebase/firebase.init";

import firebase from "@react-native-firebase/app";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

import { AppNavigator } from "@src/features/app/app.navigator";
import { AuthContext } from "@src/features/auth.firebase/auth.context.native";
import { SignInGoogle } from "@src/features/auth.firebase/signin.google";
import { ActivityIndicatorDefault } from "@src/features/components/activity.indicator.default";
import { SnackbarAutoHide } from "@src/features/components/snackbar.autohide";

import { t } from "@src/helpers/i18n";

enum EAuthState {
  checkFirebaseStarted,
  signInGoogle,
  signOut,
  error,
  errorAuth,
  signInRequired,
}

export const AuthHandler = () => {
  /** Possible states for an auth request workflow.
    NULL is the "complete/cancel" state. */
  const [authState, setAuthState] = useState<EAuthState | null>(EAuthState.checkFirebaseStarted);

  /** AuthContext definitions */
  const authContext = {
    signInGoogle: () => {
      setAuthState(EAuthState.signInGoogle);
    },

    signInComplete: () => setAuthState(null),
    signInCancel: () => setAuthState(null),
    signInOutError: () => setAuthState(EAuthState.error),
    signInRequired: () => {
      setAuthState(EAuthState.signInRequired);
      console.log("called!");
    },

    currentUser: () => {
      return auth().currentUser;
    },

    signOut: async () => {
      setAuthState(EAuthState.signOut);
      try {
        /** Try to sign-out from Firebase and Google altogether */
        await auth().signOut();
        setAuthState(null);
      } catch (error) {
        console.error("MONEY: AuthEntryPoint: signOut (1): ", error);
        /** Try to sign out just locally then */
        try {
          await GoogleSignin.signOut();
          setAuthState(null);
        } catch (error) {
          console.error("MONEY: AuthEntryPoint: signOut (2): ", error);
        } finally {
          setAuthState(null);
        }
      }
      GoogleSignin.signOut().then(() => {});
    },
  };

  /** First, as web Firebase is lazy we check for an existing application
   * over a 3.2 seconds period */
  let counter = 0;
  const checkFirebaseStarted = () => {
    setTimeout(() => {
      if (firebase.apps.length < 1 && counter < 16) {
        counter++;
        checkFirebaseStarted();
      } else {
        /** Clear authState if app started or time is up */
        setAuthState(null);
      }
    }, 200);
  };
  if (authState === EAuthState.checkFirebaseStarted) {
    checkFirebaseStarted();
    return <ActivityIndicatorDefault />;
  }

  /** Show the spinner during sign-out */
  if (authState == EAuthState.signOut) {
    return <ActivityIndicatorDefault />;
  }

  /** Show Google sign-in component */
  if (authState == EAuthState.signInGoogle) {
    return (
      <AuthContext.Provider value={authContext}>
        <SignInGoogle />
      </AuthContext.Provider>
    );
  }

  /** User authenticated! */
  return (
    <AuthContext.Provider value={authContext}>
      <>
        <AppNavigator />
        <SnackbarAutoHide
          visible={authState === EAuthState.error}
          callback={() => {
            setAuthState(null);
          }}>
          {t("error_network")}
        </SnackbarAutoHide>
        <SnackbarAutoHide
          visible={authState === EAuthState.errorAuth}
          callback={() => {
            setAuthState(null);
          }}>
          {t("error_auth")}
        </SnackbarAutoHide>
        <SnackbarAutoHide visible={authState === EAuthState.signInRequired} callback={() => setAuthState(null)}>
          {t("message_sign_in_required")}
        </SnackbarAutoHide>
      </>
    </AuthContext.Provider>
  );
};
