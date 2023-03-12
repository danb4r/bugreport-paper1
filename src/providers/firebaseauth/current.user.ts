import { getAuth } from "firebase/auth";

export function currentUser() {
  return getAuth().currentUser;
}
