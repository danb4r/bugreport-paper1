import { createContext } from "react";
import { User } from "firebase/auth";

export const AuthContext = createContext({
  /** Request Google sign-in */
  signInGoogle: () => {},

  /** Returns the firebase user object or null if not authenticated
   * The benefit in not using the direct web/native API is that
   * the code bellow AuthContext.Provider can be unified
   */
  currentUser: (): User | null => {
    return null;
  },

  /** Signs out the current user */
  signOut: async (): Promise<void> => {},

  /**
   * Native types for typechecking
   */
  signInRequired: () => {},
});
