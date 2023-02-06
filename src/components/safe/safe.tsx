import { useStoreContext } from "@/core/root-store";
import { ethers } from "ethers";
import { observer } from "mobx-react-lite";
import { NextPage } from "next";
import { useEffect } from "react";
import { AiOutlineCopy } from "react-icons/ai";
import { Container } from "../container/container";
import styles from './safe.module.scss'
import eth from "../../assets/images/currency_logo.png";

const SafeModule: NextPage = observer(({ }) => {
    const { safeStore, transactionStore } = useStoreContext();
    const { safeShortedAddress,
        getChosenSafeBalance,
        safeAddress,
        totalBalance,
        getChosenSafeData,
        safeData,
        checkIfUserHasSafeAndIsOwner,
        safeBalance,
        setModalOpen,
        modalState
    } = safeStore;

    useEffect(() => {
        transactionStore.checkIfWalletIsConnected().then(() => {
            checkIfUserHasSafeAndIsOwner(transactionStore.currentAccount).then(() => {
                if (!safeAddress) {
                    setModalOpen()
                }
                getChosenSafeBalance(safeAddress)
                getChosenSafeData(safeAddress)
            })

        })
    }, [safeAddress])

    const handleCopyToClipboard = (copiedTxt: string) => {
        navigator.clipboard.writeText(copiedTxt);
    };

    return <Container>
        <div className={styles.safe}>
            <div className={styles.safe_top}>
                <div className="d-flex">
                    {safeShortedAddress && (
                        <>
                            <p
                                className={styles.shortedAddressWrap}
                            >
                                Safe address:
                            </p>
                            <p onClick={() => handleCopyToClipboard(safeAddress)} className={styles.shortedAddress}>  {safeShortedAddress} <AiOutlineCopy /></p>
                        </>
                    )}
                </div>
                <p>Balance: {totalBalance / 1000000}$</p>
            </div>
            <div className={styles.safe_data}>
                <div className="d-flex">
                    <p className={styles.copyWrap}>Master copy: </p>
                    <p onClick={() => handleCopyToClipboard(safeData.masterCopy)} className={styles.copy}>{safeData.masterCopy} <AiOutlineCopy /></p>
                </div>
                <p>Nonce: {safeData.nonce}</p>
                <div className={styles.owners}>
                    <h1>Owners</h1>
                    <p>Treshold: {safeData.threshold}</p>
                    <ul>
                        {safeData.owners.map(owner => (
                            <li onClick={() => handleCopyToClipboard(owner)}>{owner} <AiOutlineCopy /></li>
                        ))}
                    </ul>
                </div>
                <div className={styles.assets}>
                    <h1>Assets</h1>
                    <ul>
                        {safeBalance.map(asset => (
                            <li onClick={() => handleCopyToClipboard(asset.tokenAddress)}>
                                <div className={styles.token_info}>
                                    <p className={styles.token_name}>{asset.token?.name ?? "Ether"} <AiOutlineCopy /></p>
                                    <img src={asset.token?.logoUri ?? eth.src} alt="" />
                                    <p> {parseInt(asset.balance) / 1000000} USD</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className={styles.safe_txns}>
            </div>
        </div>
    </Container>;
});
export default SafeModule;

