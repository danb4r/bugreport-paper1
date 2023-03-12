import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

export async function signOutGoogle() {
  try {
    /** Try to sign-out from Firebase */
    await auth().signOut();
  } catch (error) {}
  try {
    /** Try to sign out just locally also */
    await GoogleSignin.signOut();
  } catch (error) {}
}
