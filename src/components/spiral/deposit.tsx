import { useStoreContext } from "@/core/root-store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import {
    goerli,
    useAccount, useBalance, useContractWrite, usePrepareContractWrite, WagmiConfig,
} from "wagmi";
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import GreenTokenVaultInterface from "../../utils/GreenTokenVaultInterface.json";
import styles from './deposit.module.scss'

export const DepositModule = observer(() => {
    const { transactionStore } = useStoreContext()

    useEffect(() => {
        transactionStore.checkIfWalletIsConnected()
    }, [])

    const { data: gTokenBalance, refetch: refetchBalance } = useBalance({
        address: `0x${transactionStore.currentAccount.substring(1, transactionStore.currentAccount.length - 1)}`
    });

    console.log(`pre-deposit gToken balance: ${gTokenBalance?.formatted}`);

    const { config: depositConfig } = usePrepareContractWrite({
        address: `0x${transactionStore.currentAccount.substring(1, transactionStore.currentAccount.length - 1)}`,
        abi: GreenTokenVaultInterface.abi,
        functionName: "deposit",
    });

    const { write: deposit } = useContractWrite(depositConfig);

    return (
        <>
            <div className={styles.deposit} onClick={deposit}>Deposit 1 token</div>
            <div>gToken balance {gTokenBalance?.formatted}</div></>
    );
})