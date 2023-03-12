import { useEffect } from "react";

import { getAuth, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";

import { ActivityIndicatorDefault } from "@src/features/components/activity.indicator.default";

export const SignInGoogle = () => {
  useEffect(() => {
    const auth = getAuth();

    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  });

  return <ActivityIndicatorDefault />;
};
