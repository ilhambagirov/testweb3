import { observer } from "mobx-react-lite";
import { NextPage } from "next";
import { SyntheticEvent } from "react";
import styles from "./main.module.scss";
interface Props {
  placeholder: string;
  name: string;
  type: string;
  value?: string;
  handleFormChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => void;
}

export const Input: NextPage<Props> = observer(
  ({ placeholder, name, type, value, handleFormChange }) => (
    <input
      placeholder={placeholder}
      type={type}
      step="0.0001"
      value={value}
      name={name}
      onChange={(e) => handleFormChange(e, name)}
      className={styles.input}
    />
  )
);
