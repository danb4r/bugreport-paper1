import { createContext, ReactNode, useContext, useMemo, useState, useEffect } from "react";
import { Platform } from "react-native";

/** Init Firebase only once (web and native) */
import "@src/services/firebase/firebase.init";

import { useSnack } from "@src/providers/snack";
import { useChangeState } from "@src/hooks/use-change-state";
import { t } from "@src/helpers/i18n";

import { CheckGoogleWebReturn } from "./check.google.web.return";
import { CheckFirebaseStarted } from "./check.firebase.started";
import { SignInGoogle, ESignInResponseCodes } from "./signin.google";
import { signOutGoogle } from "./signout.google";
import { currentUser } from "./current.user";

const FirebaseAuthContext = createContext<{
  currentUser: typeof currentUser;
  signIn: () => void;
  signOut: () => void;
}>({
  // signInGoogle: () => {},
  currentUser: currentUser,
  signIn: () => {},
  signOut: () => {},
});

function FirebaseAuthProvider({ children }: { children: ReactNode }) {
  const snack = useSnack();

  const [state, changeState] = useChangeState();

  const [webReturn, setWebReturn] = useState(false);
  const confirmWebReturn = () => setWebReturn(true);
  // CONTINUE HERE... get response code from check,google.web.return

  const [signInRequested, setSignInRequested] = useState(false);

  const [firebaseStarted, setFirebaseStarted] = useState(false);
  const confirmFirebaseStarted = () => setFirebaseStarted(true);

  /** Triggers sign in */
  function handleSignIn() {
    setSignInRequested(true);
  }

  /** Handle sign in return code callback */
  function handleSignInReturn(code: ESignInResponseCodes) {
    setSignInRequested(false);

    snack.showSnack({
      message:
        code === ESignInResponseCodes.success
          ? t("signin_successful")
          : code === ESignInResponseCodes.cancel
          ? t("signin_canceled")
          : t("signin_error"),
    });
  }

  /** Handle sign out */
  async function handleSignOut() {
    await signOutGoogle();
    changeState();
  }

  const firebaseAuthContext = useMemo(
    () => ({
      currentUser: currentUser,
      signIn: handleSignIn,
      signOut: handleSignOut,
    }),
    [state]
  );

  /**
   * Rendering
   */

  /** Web return from web authentication? */
  if (Platform.OS === "web" && !webReturn) return <CheckGoogleWebReturn callbackChecked={confirmWebReturn} />;

  /** Sign in requested? */
  if (signInRequested) return <SignInGoogle callback={handleSignInReturn} />;

  /** Has Firebase started properly? */
  if (!firebaseStarted) return <CheckFirebaseStarted callbackChecked={confirmFirebaseStarted} />;

  /** Provide context to children */
  return <FirebaseAuthContext.Provider value={firebaseAuthContext}>{children}</FirebaseAuthContext.Provider>;
}

function useFirebaseAuth() {
  return useContext(FirebaseAuthContext);
}

export { FirebaseAuthProvider, useFirebaseAuth };
