import { createContext, useContext } from "react";
import TransactionStore from "./transaction-store";
import SafeStore from '../components/safe/stores/safe-store'

interface Store {
    transactionStore: TransactionStore;
    safeStore: SafeStore
}

export const rootStore: Store = {
    transactionStore: new TransactionStore(),
    safeStore: new SafeStore()
};

export const StoreContext = createContext(rootStore);

export function useStoreContext() {
    return useContext(StoreContext);
}