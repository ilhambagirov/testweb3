import { NextPage } from "next";
import styles from './header.module.scss'
import { Container } from "../container/container";
import { observer } from "mobx-react-lite";
import { useStoreContext } from "@/core/root-store";
import Link from "next/link";

const Header: NextPage = observer(({ }) => {
  const { transactionStore } = useStoreContext();

  return (
    <div className={styles.header} >
      <Container>
        <div className={styles.header_content} >
          <div className={styles.header_logo}>
            <p><Link href={"/"}>IBTRANSACT</Link></p>
          </div>
          <div className={styles.header_right}>
            <div className={styles.header_menu}>
              <ul className="d-flex">
                <li>
                  <Link href="/transactions">Transactions</Link>
                </li>
                <li>
                  Balance: {transactionStore.balance}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
});

export default Header;