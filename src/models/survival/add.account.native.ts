// import { currentUser } from "@src/services/firebase/firebase.api";

// import firestore from "@react-native-firebase/firestore";

// export enum addSurvivalAccountResults {
//   success,
//   existant,
// }

// export const addSurvivalAccount = async (accountName: string) => {
//   /** Check if existant */
//   const coll = firestore().collection("" + currentUser()?.uid + "/survivals/accounts");
//   const quer = coll.where("name", "==", accountName).limit(1);
//   const result = await quer.get();
//   if (result.docs.length > 0) return addSurvivalAccountResults.existant;

//   /** Add new account */
//   await coll.add({ name: accountName, ts: new Date().toISOString() });
//   return addSurvivalAccountResults.success;
// };
