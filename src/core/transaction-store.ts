import { makeAutoObservable, runInAction } from "mobx";
import { ethers, utils } from "ethers";
import { smartContractABI, smartContractAddress } from "../utils/constants";
import { TransactionForm } from "./models/transactions";
import agent from "./api/agent";
import { Pagination, PagingParams } from "./models/pagination";
import { Transaction } from "@/components/transactions/models/transaction";

export default class TransactionStore {
  currentAccount: string = "";
  shortedAccount: string = "";
  balance: string = "";
  pagination: Pagination | null = null;
  pagingParams = new PagingParams();
  transaction: TransactionForm = {
    addressTo: "",
    amount: 0,
    keyword: "",
    message: "",
  };
  transactionList = new Map<number, Transaction>()
  loading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  //pagination
  get axiosParams() {
    const params = new URLSearchParams();
    params.append("PageNumber", this.pagingParams.pageNumber.toString());
    params.append("PageSize", this.pagingParams.pageSize.toString());
    return params;
  }
  setPagingParams = (pagingParams: PagingParams) => {
    this.pagingParams = pagingParams;
  };

  handleTransaction = (transaction: TransactionForm) => {
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

      const balance = await window?.ethereum.request({
        method: "eth_getBalance",
        params: [accounts[0], "latest"],
      })

      runInAction(() => {
        if (accounts.length) {
          this.shortedAccount = `${accounts[0].slice(0, 5)}...${accounts[0].slice(accounts[0].length - 4)}`;
          this.currentAccount = accounts[0];
          this.balance = ethers.utils.formatEther(BigInt(balance).toString()).substring(0, 7)
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

        const balance = await window?.ethereum.request({
          method: "eth_getBalance",
          params: [accounts[0], "latest"],
        })

        runInAction(() => {
          if (accounts.length) {
            this.currentAccount = accounts[0];
            this.balance = ethers.utils.formatEther(BigInt(balance).toString()).substring(0, 7)
            this.shortedAccount = `${accounts[0].slice(0, 5)}...${accounts[0].slice(accounts[0].length - 4)}`;
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

      const transactionHash = await transactionContract.addTransaction(
        addressTo,
        parsedAmount,
        message,
        keyword
      );

      await transactionHash.wait();
      this.setLoading(false);
      //   const transactionCount = await transactionContract.getTransacionCount();
    } catch (error) {
      this.setLoading(false);
      console.log(error);
    }
  };

  getAllTransactions = async () => {
    try {
      await this.checkIfWalletIsConnected()
      this.transactionList.clear()
      agent.EtherScan.getAll(this.currentAccount, this.pagingParams.pageSize, this.pagingParams.pageNumber)
        .then((response) => {
          runInAction(() => {
            Array.from(response.result).forEach((item) => {
              this.transactionList.set(parseInt(item.timeStamp), item)
            })
          })
        })
    } catch (error) {
      console.log(error);
    }
  }
}
