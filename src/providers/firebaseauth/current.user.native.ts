import auth from "@react-native-firebase/auth";

export function currentUser() {
  return auth().currentUser;
}
