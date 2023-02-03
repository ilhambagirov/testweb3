import { NextPage } from "next";
import { Container } from "../container/container";
import styles from "./main.module.scss";
import { Input } from "../main/input";
import { observer } from "mobx-react-lite";
import { useStoreContext } from "@/core/root-store";
import { SyntheticEvent, useEffect, useState } from "react";
import Loader from "../loader/loader";

const Main: NextPage = observer(({}) => {
  const { transactionStore } = useStoreContext();
  const [transactionData, setTransactionData] = useState({
    addressTo: "",
    amount: 0,
    keyword: "",
    message: "",
  });

  const handleFormChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    event.preventDefault();
    setTransactionData((prevState) => ({
      ...prevState,
      [name]: event.target.value,
    }));
  };

  const {
    checkIfWalletIsConnected,
    transaction,
    sendTransaction,
    connectWallet,
    currentAccount,
    handleTransaction,
    loading,
  } = transactionStore;

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    handleTransaction(transactionData);

    const { addressTo, amount, keyword, message } = transaction;
    e.preventDefault();

    if (!addressTo || !amount || !keyword || !message) return;
    sendTransaction();

    setTransactionData({
      addressTo: "",
      amount: 0,
      keyword: "",
      message: "",
    });
  };

  return (
    <Container>
      <div className={styles.main_page}>
        <div
          className={`${styles.content} row d-flex justify-content-between w-100`}
        >
          <div className={`${styles.content_left} col-6`}>
            <h3 className={styles.content_slogan}>
              Transact crypto all over the world
            </h3>
            <p className={styles.desc}>
              We provide better crypto services, use and be happy!
            </p>
            {!currentAccount && (
              <button className={styles.wallet} onClick={connectWallet}>
                Connect Wallet
              </button>
            )}

            {currentAccount && (
              <p className={styles.desc}>
                Your digital address : {currentAccount}
              </p>
            )}
          </div>
          <div className={`${styles.content_right} col-6`}>
            <form action="" className={styles.form} onSubmit={handleSubmit}>
              <Input
                placeholder="Address To"
                name="addressTo"
                type="text"
                handleFormChange={handleFormChange}
                value={transactionData.addressTo}
              />
              <Input
                placeholder="Amount (ETH)"
                name="amount"
                type="number"
                handleFormChange={handleFormChange}
                value={
                  transactionData.amount === 0
                    ? ""
                    : transactionData.amount.toString()
                }
              />
              <Input
                placeholder="Keyword (Gif)"
                name="keyword"
                type="text"
                handleFormChange={handleFormChange}
                value={transactionData.keyword}
              />
              <Input
                placeholder="Enter Message"
                name="message"
                type="text"
                handleFormChange={handleFormChange}
                value={transactionData.message}
              />

              {loading ? (
                <Loader />
              ) : (
                <button className={styles.send}>Send</button>
              )}
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
});

export default Main;
