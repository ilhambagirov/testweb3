import { NextPage } from "next";
import { Container } from "../container/container";
import styles from './main.module.scss'
import { Input } from "../main/input"

const Main: NextPage = ({ }) => {
  return (
    <Container>
      <div className={styles.main_page}>
        <div className={`${styles.content} row d-flex justify-content-between w-100`}>
          <div className={`${styles.content_left} col-6`}>
            <h3 className={styles.content_slogan}>Transact crypto all over the world</h3>
            <p className={styles.desc}>We provide better crypto services, use and be happy!</p>
            <button className={styles.wallet}>Connect Wallet</button>
          </div>
          <div className={`${styles.content_right} col-6`}>
            <form action="" className={styles.form}>
              <Input placeholder="Address To" name="addressTo" type="text" />
              <Input placeholder="Amount (ETH)" name="amount" type="number" />
              <Input placeholder="Keyword (Gif)" name="keyword" type="text" />
              <Input placeholder="Enter Message" name="message" type="text" />
              <button className={styles.send}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </Container >
  )
};

export default Main;

