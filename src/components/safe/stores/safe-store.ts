import { makeAutoObservable, runInAction } from "mobx";
import agent from "../../../core/api/agent";
import { Pagination, PagingParams } from "../../../core/models/pagination";
import { Transaction } from "@/components/transactions/models/transaction";
import { SafeData } from "../models/safe-data";
import { BalanceData } from "../models/balance-data";

export default class SafeStore {
    safeAddress: string = "";
    safeShortedAddress: string = "";
    pagination: Pagination | null = null;
    pagingParams = new PagingParams();
    transactionList = new Map<number, Transaction>()
    loading: boolean = false;
    safes: string[] = new Array()
    safeData: SafeData = { address: "", masterCopy: "", owners: new Array(), threshold: 0, nonce: "" }
    safeBalance: BalanceData[] = new Array()
    modalState: boolean = false
    totalBalance: number = 0

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

    setLoading = (state: boolean) => {
        runInAction(() => {
            this.loading = state;
        });
    };

    setModalOpen = () => {
        console.log("Salam");
        runInAction(() => {
            this.modalState = true;
        });
    };

    setModalClose = () => {
        runInAction(() => {
            this.modalState = false;
        });
    };

    getTotalSafeBalance = () => {
        this.totalBalance = 0
        runInAction(() => {
            this.safeBalance.map(balanceData => {
                this.totalBalance += parseInt(balanceData.balance)
            })
        })
        console.log(this.totalBalance);
    }

    checkIfUserHasSafeAndIsOwner = async (walletAddress: string) => {
        try {
            this.safes = new Array()
            var safeList = await agent.GnosisSafe.checkIfHasSafeAndOwner(walletAddress)
            if (!safeList) return alert("You have no safes!")

            runInAction(() => {
                safeList.safes.forEach(safe => {
                    this.safes.push(safe)
                })
            })
        } catch (error) {
            console.log(error);
        }
    };

    chooseSafeAddress = (safeAddress: string) => {
        try {
            runInAction(() => {
                this.safeAddress = safeAddress;
                this.safeShortedAddress = `${safeAddress.slice(0, 5)}...${safeAddress.slice(safeAddress.length - 4)}`;
            })
        } catch (error) {
            console.log(error);
        }
    }

    getChosenSafeData = async (safeAddress: string) => {
        try {
            var safeData = await agent.GnosisSafe.getSafeDataByAddress(safeAddress)

            if (!safeData) return alert("You have no safes!")

            runInAction(() => {
                this.safeData = safeData;
            })
        } catch (error) {
            console.log(error);
        }
    };

    getChosenSafeBalance = async (safeAddress: string) => {
        try {
            var safeBalance = await agent.GnosisSafe.getSafeBalanceByAddress(safeAddress)

            if (!safeBalance) return alert("You have no safes!")

            console.log(safeBalance);

            runInAction(() => {
                this.safeBalance = safeBalance;
            })

            this.getTotalSafeBalance()
        } catch (error) {
            console.log(error);
        }
    };


    // getAllTransactions = async () => {
    //     try {
    //         await this.checkIfWalletIsConnected()
    //         this.transactionList.clear()
    //         agent.EtherScan.getAll(this.currentAccount, this.pagingParams.pageSize, this.pagingParams.pageNumber)
    //             .then((response) => {
    //                 runInAction(() => {
    //                     Array.from(response.result).forEach((item) => {
    //                         this.transactionList.set(parseInt(item.timeStamp), item)
    //                     })
    //                 })
    //             })
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
}
