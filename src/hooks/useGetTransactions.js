import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { useGetUser } from "./useGetUser";

export const useGetTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [transactionTotal, setTransactionTotal] = useState({
    balance: 0,
    income: 0,
    expense: 0,
  });

  const transactionCollectionRef = collection(db, "transactions");
  const { uid } = useGetUser();

  const getTransactions = async () => {
    let unsubscribe;

    try {
      const queryTransactions = query(
        transactionCollectionRef,
        where("uid", "==", uid),
        orderBy("createdAt")
      );
      unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
        let docs = [];
        let totalIncome = 0;
        let totalExpense = 0;

        snapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;

          docs.push({ id, ...data });
          if (data.transactionType === "expense") {
            totalExpense += Number(data.transactionAmount);
          } else {
            totalIncome += Number(data.transactionAmount);
          }

        });
        setTransactions(docs);

        let balance = totalIncome - totalExpense;
        setTransactionTotal({
          balance: balance,
          income: totalIncome,
          expense: totalExpense,
        });
      });
    } catch (err) {
      console.error("Error fetching transactions: ", err);
    }
    return () => {
      unsubscribe();
    };
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return { transactions, transactionTotal };
};
