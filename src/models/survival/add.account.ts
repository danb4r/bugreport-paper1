// import { getFirestore } from "firebase/firestore";
// import { currentUser } from "@src/services/firebase/firebase.api";
// import { doc, getDoc, setDoc, arrayUnion, DocumentReference } from "firebase/firestore";

// import { strTrimRemMultiSpaces, strTrimNormLowerRemMultiSpaces } from "@src/helpers/strings";

// export enum EAddSurvivalAccountResults {
//   success,
//   existent,
//   error,
// }

// type TNewAccountObject = {
//   nameId: string;
//   utcClient: string;
// };

// /** Check if exists an account with newAccountNameFixed */
// const isSurvivalAccountExistent = async (newAccountNameFixed: string, docRef: DocumentReference): Promise<boolean> => {
//   const result = await getDoc(docRef)
//     .then((result) => {
//       if (Array.isArray(result.data()?.accounts)) {
//         const resultArray: Array<TNewAccountObject> = result.data()?.accounts;
//         console.log("RESULT ARRAY: ", resultArray);
//         const found = resultArray.findIndex((element) => element.nameId == newAccountNameFixed);
//         console.log("FOUND: ", found);
//         if (found >= 0) return true;
//       }
//       return false;
//     })
//     .catch((error) => {
//       console.error(__filename + ": ", error);
//       return false;
//     });
//   return result;
// };

// /** Adds a new survival account */
// export const addSurvivalAccount = async (newAccountName: string) => {
//   /** Assembles the new account object */
//   const newAccountNameFixed = strTrimRemMultiSpaces(newAccountName);
//   const newAccountObject: TNewAccountObject = { nameId: newAccountNameFixed, utcClient: new Date().toUTCString() };

//   /** Ref to survival accounts object */
//   const docRef = doc(getFirestore(), "" + currentUser()?.uid, "survival_accounts");

//   if (await isSurvivalAccountExistent(newAccountNameFixed, docRef)) return EAddSurvivalAccountResults.existent;

//   /** Add new account */
//   const newArrayEl = arrayUnion(newAccountObject);

//   /** TODO Check if wait will wait forever if promise is not fulfilled */
//   setDoc(docRef, { accounts: newArrayEl }, { merge: true })
//     .then(() => {
//       console.log("SUCCESS....");
//     })
//     .catch(() => {
//       console.log("FAIL...");
//     });
//   return EAddSurvivalAccountResults.success;
// };
