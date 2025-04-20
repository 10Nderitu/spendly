import React, { useState } from "react";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { useGetUser } from "../../hooks/useGetUser";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";

export const ExpenseTracker = () => {
  const { addTransaction } = useAddTransaction();
  const { transactions, transactionTotal} = useGetTransactions();
  const { name, uid, profilePhoto } = useGetUser();
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("Expense");

  const { balance, income, expense } = transactionTotal;

  const onSubmit = async (e) => {
    e.preventDefault();
    addTransaction({
      description,
      transactionAmount,
      transactionType,
    });
    setDescription("");
    setTransactionAmount(0);
  };

  const signUserOut = async () => {
    try {
   await signOut(auth);
   localStorage.clear();
   navigate("/");
    } catch (error) {
        console.error(error)
    }
  }
  return (
    <>
      {" "}
      <div className="dashboard">
        <div className="container">
          <h1> {uid} Expense Tracker</h1>
          <div className="balance">
            <h3>Your Balance</h3>
            <h2>Ksh {balance}</h2>
            <div className="summary">
              <div className="income">
                <h4>Income</h4>
                <p>Ksh {income}</p>
              </div>
              <div className="expense">
                <h4>Expenses</h4>
                <p>Ksh {expense}</p>
              </div>
            </div>
          </div>
          <form className="add-transaction" onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Description"
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="number"
              placeholder="Amount"
              value={transactionAmount}
              required
              onChange={(e) => setTransactionAmount(e.target.value)}
            />
            <input
              type="radio"
              id="income"
              value="income"
              checked={transactionType === "income"}
              onChange={(e) => setTransactionType(e.target.value)}
            />
            <label htmlFor="income">Income</label>
            <input
              type="radio"
              id="expense"
              value="expense"
              checked={transactionType === "expense"}
              onChange={(e) => setTransactionType(e.target.value)}
            />
            <label htmlFor="expense">Expense</label>
            <button type="submit">Add Transaction</button>
          </form>
        </div>
        <button className="sign-out" onClick={signUserOut}>Sign Out</button>
      </div>
      <div className="transactions">
        <h3>Transactions</h3>
        <ul>
          {transactions.map((transaction) => {
            const { description, transactionAmount, transactionType } =
              transaction;
            return (
              <li>
                <h4>{transaction.description}</h4>
                <p>
                  Ksh {transactionAmount} <label>{transactionType}</label>
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
