import { makeAutoObservable, runInAction } from "mobx";
import { ethers } from "ethers";
import { smartContractABI, smartContractAddress } from '../utils/constants'
export default class TransactionStore {
    constructor() {
        makeAutoObservable(this);
    }

    createEthereumContract = () => {
        const provider = new ethers.providers.Web3Provider(window?.ethereum);
        const signer = provider.getSigner();
        const transactionsContract = new ethers.Contract(smartContractAddress, smartContractABI, signer);

        return transactionsContract;
    };

    checkIfWalletIsConnected = () => {
        if (!window?.ethereum) return alert("Please, connect to your wallet")
    };

    // connectWallet = () => {
    //     try {
    //         this.checkIfWalletIsConnected();
    //         const accounts = await window?.ethereum.request({ method: "eth_requestAccounts", });
    //         setCurrentAccount(accounts[0]);
    //     } catch (error) {

    //     }
    // }
}