import { useStoreContext } from "@/core/root-store";
import { ethers } from "ethers";
import { observer } from "mobx-react-lite";
import { NextPage } from "next";
import { useEffect } from "react";
import { Container } from "../container/container";
import styles from './transactions-module.module.scss'

const TransactionsModule: NextPage = observer(({ }) => {
  const { transactionStore } = useStoreContext();

  const {
    transactionList, getAllTransactions
  } = transactionStore;

  useEffect(() => {
    getAllTransactions();
  }, [])

  return (<>
    <Container>
      <div className={`row d-flex justify-content-between ${styles.transactions}`}>
        {
          Array.from(transactionList.values()).map((transaction) => (
            <div key={transaction.timeStamp} className={`${styles.transaction_wrapper} col-xl-4 col-md-6 col-12`}>
              <div className={`${styles.transaction}`}>
                <div className={styles.transaction_top}>
                  <p>Hash: <p>{transaction.hash}</p></p>
                </div>
                <div className={styles.transaction_middle}>
                  <p>From: {transaction.from}</p>
                  <p>To: {transaction.to}</p>
                </div>
                <div className={styles.transaction_bottom}>
                  <p>Amount: {ethers.utils.formatEther(transaction.value)}</p>
                  <p>Gas fee: {transaction.gasUsed}</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </Container>

  </>);
});

export default TransactionsModule;
