import { observer } from "mobx-react-lite";
import { NextPage } from "next";
import { BallTriangle } from "react-loader-spinner";
import styles from "./loader.module.scss";

const Loader: NextPage = observer(({}) => {
  return (
    <div className={styles.loader}>
      <BallTriangle
        height={50}
        width={50}
        radius={5}
        color="#4fa94d"
        ariaLabel="ball-triangle-loading"
        visible={true}
      />
    </div>
  );
});

export default Loader;
