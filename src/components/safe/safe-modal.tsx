import { useStoreContext } from "@/core/root-store";
import { observer } from "mobx-react-lite";
import { NextPage } from "next";
import styles from './safe.module.scss'
import Modal from 'react-modal';
import Link from "next/link";
import { useEffect } from "react";

const SafeModule: NextPage = observer(({ }) => {

    const { safeStore, transactionStore } = useStoreContext();
    const { setModalClose, setModalOpen, modalState, safes, chooseSafeAddress, checkIfUserHasSafeAndIsOwner } = safeStore;

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgb(33, 49, 80)'
        },
    };

    useEffect(() => {
        console.log(transactionStore.currentAccount)
        checkIfUserHasSafeAndIsOwner(transactionStore.currentAccount)
    }, [])

    const handleChooseSafeAddress = (sadeAddres: string) => {
        chooseSafeAddress(sadeAddres)
        setModalClose();
    }

    console.log(modalState)

    Modal.setAppElement('#__next');

    return <div className={styles.safe}>
        <Modal
            isOpen={modalState}
            onRequestClose={setModalClose}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <div className={styles.safeList}>
                <h1>Safes</h1>
                <ul>
                    {safes.map(safe => (
                        <li key={safe} onClick={() => handleChooseSafeAddress(safe)}><Link href={"my-safe"}>{safe}</Link></li>
                    ))}
                </ul>
            </div>
        </Modal>
    </div>;
});

export default SafeModule;
