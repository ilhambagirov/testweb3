import Layout from "@/components/layout/layout";
import TransactionsModule from "@/components/transactions/transactions-module";
import { NextPage } from "next";
import "../common/styles/globals.css";

const Transactions: NextPage = ({}) => {
  return <TransactionsModule />;
};

export default Transactions;
