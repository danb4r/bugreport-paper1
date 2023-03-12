import { getAuth } from "firebase/auth";
export async function signOutGoogle() {
  await getAuth().signOut();
}
