import { createContext } from "react";

export const AuthContext = createContext({
  /** Dispatches Google sign in */
  signInGoogle: () => {},

  /** Sign in process complete */
  signInComplete: () => {},

  /** Sign in process canceled */
  signInCancel: () => {},

  /** Error on sign in or on sign out */
  signInOutError: () => {},

  /** Sign in required somewhere to access some functionality */
  signInRequired: () => {},

  /** Returns the firebase user object or null if not authenticated
   * The benefit in not using the direct web/native API is that
   * part of the code can be unified
   */
  currentUser: () => {},

  /** Signs out the current user. Returns a Promise<void>. */
  signOut: async (): Promise<void> => {},
});
