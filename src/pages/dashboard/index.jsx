import React, { useState } from "react";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { useGetUser } from "../../hooks/useGetUser";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";

export const ExpenseTracker = () => {
  const { addTransaction } = useAddTransaction();
  const { transactions, transactionTotal } = useGetTransactions();
  const { name, uid, profilePhoto } = useGetUser();
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");

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
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-8 space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Expense Tracker</h1>
          <button
            onClick={signUserOut}
            className="text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
          >
            Sign Out
          </button>
        </div>

        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Your Balance
          </h2>
          <p className="text-3xl font-bold text-green-600">Ksh {balance.toLocaleString()}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-green-100 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-green-800">Income</h3>
            <p className="text-lg font-bold text-green-700">Ksh {income.toLocaleString()}</p>
          </div>
          <div className="bg-red-100 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-red-800">Expenses</h3>
            <p className="text-lg font-bold text-red-700">Ksh {expense.toLocaleString()}</p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Description"
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          />
          <input
            type="number"
            placeholder="Amount"
            value={transactionAmount}
            required
            onChange={(e) => setTransactionAmount(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          />
          <div className="flex gap-4 items-center">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="income"
                checked={transactionType === "income"}
                onChange={(e) => setTransactionType(e.target.value)}
                className="accent-green-500"
              />
              Income
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="expense"
                checked={transactionType === "expense"}
                onChange={(e) => setTransactionType(e.target.value)}
                className="accent-red-500"
              />
              Expense
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
          >
            Add Transaction
          </button>
        </form>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Transactions</h3>
          <ul className="space-y-2 max-h-60 overflow-y-auto">
            {transactions.map((transaction, index) => (
              <li
                key={index}
                className={`flex justify-between items-center p-4 rounded-lg shadow-sm ${
                  transaction.transactionType === "income"
                    ? "bg-green-50"
                    : "bg-red-50"
                }`}
              >
                <div>
                  <h4 className="font-semibold text-gray-800">
                    {transaction.description}
                  </h4>
                  <p className="text-sm text-gray-500 capitalize">
                    {transaction.transactionType}
                  </p>
                </div>
                <p
                  className={`font-bold ${
                    transaction.transactionType === "income"
                      ? "text-green-700"
                      : "text-red-700"
                  }`}
                >
                  Ksh {Number(transaction.transactionAmount).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
