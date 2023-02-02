import { NextPage } from "next";
import NavbarItem from "./navbar-item";
import styles from './header.module.scss'
import { Container } from "../container/container";

const Header: NextPage = ({ }) => {
  return (
    <div className={styles.header} >
      <Container>
        <div className={styles.header_content} >
          <div className={styles.header_logo}>
            <p>IBTRANSACT</p>
          </div>
          <ul className={styles.header_menu}>
            {["Services", "Transactions", "Wallets"].map(menu => (
              <NavbarItem title={menu} key={menu} />
            ))}
            <li className={styles.header_login}>
              Login
            </li>
          </ul>
        </div>
      </Container>
    </div>
  )
};

export default Header;