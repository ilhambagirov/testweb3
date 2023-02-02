import { NextPage } from "next";
import styles from './main.module.scss'
interface Props {
    placeholder: string
    name: string,
    type: string,
    value?: string,
    //handleChange: (e: SyntheticEvent<HTMLInputElement>, name: string) => void
}

export const Input: NextPage<Props> = ({ placeholder, name, type, value }) => (
    <input
        placeholder={placeholder}
        type={type}
        step="0.0001"
        value={value}
        name={name}
        //onChange={(e) => handleChange(e, name)}
        className={styles.input}
    />
);