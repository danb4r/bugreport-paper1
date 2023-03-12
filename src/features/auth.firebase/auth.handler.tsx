import { useState } from "react";

/** Init Firebase only once (web and native) */
import "@src/services/firebase/firebase.init";

import { getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

import { AuthContext } from "@src/features/auth.firebase/auth.context";
import { AuthCheckGoogleWebReturn } from "@src/features/auth.firebase/auth.check.google.web.return";
import { SignInGoogle } from "@src/features/auth.firebase/signin.google";
import { ActivityIndicatorDefault } from "@src/features/components/activity.indicator.default";
import { SnackbarAutoHide } from "@src/features/components/snackbar.autohide";

import { LinkWeb } from "@src/features/link/web/link.web";

import { t } from "@src/helpers/i18n";

enum EAuthState {
  checkGoogleWebReturn,
  checkFirebaseStarted,
  signInGoogle,
  signOut,
  noUser,
  error,
  errorAuth,
}

export const AuthHandler = () => {
  /** Possible states for an auth request workflow.
    NULL is the "complete/cancel" state. */
  const [authState, setAuthState] = useState<EAuthState>(EAuthState.checkGoogleWebReturn);

  const webGoogleReturnChecked = () => {
    setAuthState(EAuthState.checkFirebaseStarted);
  };

  const webGoogleReturnError = () => {
    setAuthState(EAuthState.errorAuth);
  };

  /** AuthContext definitions */
  const authContext = {
    signInGoogle: () => {
      setAuthState(EAuthState.signInGoogle);
    },

    currentUser: () => {
      return getAuth().currentUser;
    },

    signOut: async () => {
      setAuthState(EAuthState.signOut);
      return getAuth()
        .signOut()
        .then(() => {
          /** When sign-out complete, clear authState */
          setAuthState(EAuthState.signInGoogle);
        });
    },

    /** TS to avoid compiler errors between web and native files */
    signInRequired: () => {},
  };

  /** First check if the app has revived from a web auth return from Google */
  if (authState === EAuthState.checkGoogleWebReturn)
    return <AuthCheckGoogleWebReturn callbackChecked={webGoogleReturnChecked} callbackError={webGoogleReturnError} />;

  /** Second, as web Firebase is lazy we check for an existing application
   * over a 3.2 seconds period */
  let counter = 0;
  const checkFirebaseStarted = () => {
    setTimeout(() => {
      if (getApps().length < 1 && counter < 16) {
        counter++;
        checkFirebaseStarted();
      } else {
        /** Clear authState if app started or time is up */
        if (getAuth().currentUser) setAuthState(EAuthState.noUser);
        else setAuthState(EAuthState.signInGoogle);
      }
    }, 200);
  };
  if (authState === EAuthState.checkFirebaseStarted) {
    /** After web return check, check if firebase has started */
    checkFirebaseStarted();
    return <ActivityIndicatorDefault />;
  } else if (authState == EAuthState.signInGoogle) {
    /**
     * Show Google sign-in component
     * No need to get to another state as Google Redirect will reset the app
     * to original state and we will get back to check web return
     */
    return <SignInGoogle />;
  } else if (authState == EAuthState.signOut) {
    /** Show the spinner during sign-out */
    return <ActivityIndicatorDefault />;
  } else {
    /** This is being show to:
     * noUser,
     * error,
     * errorAuth,
     */
    return (
      <AuthContext.Provider value={authContext}>
        <SnackbarAutoHide
          visible={authState === EAuthState.error}
          callback={() => {
            setAuthState(EAuthState.noUser);
          }}>
          {t("error_network")}
        </SnackbarAutoHide>
        <SnackbarAutoHide
          visible={authState === EAuthState.errorAuth}
          callback={() => {
            setAuthState(EAuthState.noUser);
          }}>
          {t("error_auth")}
        </SnackbarAutoHide>
        <LinkWeb />
      </AuthContext.Provider>
    );
  }
};
