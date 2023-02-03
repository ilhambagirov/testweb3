import { makeAutoObservable, runInAction } from "mobx";
import { ethers } from "ethers";
import { smartContractABI, smartContractAddress } from "../utils/constants";
import { Transaction } from "./models/transactions";

export default class TransactionStore {
  currentAccount: string = "";
  transaction: Transaction = {
    addressTo: "",
    amount: 0,
    keyword: "",
    message: "",
  };
  loading: boolean = false;
  //   transactionCount: number | null = localStorage.getItem("count")
  //     ? typeof window !== "undefined"
  //       ? parseInt(window.localStorage.getItem("count")!)
  //       : null
  //     : null;

  constructor() {
    makeAutoObservable(this);
  }

  handleTransaction = (transaction: Transaction) => {
    runInAction(() => {
      this.transaction = transaction;
    });
  };

  setLoading = (state: boolean) => {
    runInAction(() => {
      this.loading = state;
    });
  };

  createEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(window?.ethereum);
    const signer = provider.getSigner();
    const transactionsContract = new ethers.Contract(
      smartContractAddress,
      smartContractABI,
      signer
    );
    return transactionsContract;
  };

  checkIfWalletIsConnected = async () => {
    if (!window?.ethereum) return alert("Please, connect to your wallet");

    if (window?.ethereum.request) {
      const accounts = await window?.ethereum.request({
        method: "eth_accounts",
      });

      runInAction(() => {
        if (accounts.length) {
          this.currentAccount = accounts[0];
        }
      });
    }
  };

  connectWallet = async () => {
    try {
      this.checkIfWalletIsConnected();
      if (window?.ethereum.request) {
        const accounts = await window?.ethereum.request({
          method: "eth_requestAccounts",
        });

        runInAction(() => {
          if (accounts.length) {
            this.currentAccount = accounts[0];
          }
        });
      }
    } catch (error) {
      console.log("ethereum object not found");
    }
  };

  sendTransaction = async () => {
    try {
      this.checkIfWalletIsConnected();
      this.setLoading(true);
      const { addressTo, amount, keyword, message } = this.transaction;

      const transactionContract = this.createEthereumContract();
      const parsedAmount = ethers.utils.parseEther(amount.toString());

      if (window?.ethereum.request) {
        await window?.ethereum.request({
          method: "eth_sendTransaction",
          params: [
            {
              from: this.currentAccount,
              to: addressTo,
              gas: "0x5208",
              value: parsedAmount._hex,
            },
          ],
        });
      }
      console.log(parsedAmount);
      const transactionHash = await transactionContract.addTransaction(
        addressTo,
        amount,
        message,
        keyword
      );
      console.log(parsedAmount);

      console.log(`Loading - ${transactionHash.hash}`);

      await transactionHash.wait();
      this.setLoading(false);
      console.log(`Success - ${transactionHash.hash}`);

      //   const transactionCount = await transactionContract.getTransacionCount();
    } catch (error) {
      this.setLoading(false);
      console.log("ethereum object not found");
    }
  };
}
