import { NextPage } from "next";
import NavbarItem from "./navbar-item";
import styles from './header.module.scss'
import { Container } from "../container/container";
import { observer } from "mobx-react-lite";
import { useStoreContext } from "@/core/root-store";

const Header: NextPage = observer(({ }) => {
  const { transactionStore } = useStoreContext();

  return (
    <div className={styles.header} >
      <Container>
        <div className={styles.header_content} >
          <div className={styles.header_logo}>
            <p>IBTRANSACT</p>
          </div>
          <div className={styles.balance}>
            <p>Balance: {transactionStore.balance}</p>
          </div>
        </div>
      </Container>
    </div>
  )
});

export default Header;