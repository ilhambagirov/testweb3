import { createContext, useContext } from "react";
import TransactionStore from "./transaction-store";

interface Store {
    transactionStore: TransactionStore;
}

export const rootStore: Store = {
    transactionStore: new TransactionStore(),
};

export const StoreContext = createContext(rootStore);

export function useStoreContext() {
    return useContext(StoreContext);
}