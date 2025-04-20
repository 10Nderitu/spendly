import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase";
import { useGetUser } from "./useGetUser";

export const useAddTransaction = () => {
  const transactionCollectionRef = collection(db, "transactions");
  const { uid } = useGetUser();

  const addTransaction = async ({
    description,
    transactionAmount,
    transactionType,
  }) => {
    await addDoc(transactionCollectionRef, {
      uid,
      description,
      transactionAmount,
      transactionType,
      createdAt: serverTimestamp(),
    });
  };
  return { addTransaction };
};
