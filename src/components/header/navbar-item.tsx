import { NextPage } from "next";

interface Props {
    title: string,
    classProps?: string
    key: any
}

const NavbarItem: NextPage<Props> = ({ title, classProps, key }) => {
    return (
        <li className={classProps} key={key}>{title}</li>)
};
export default NavbarItem;
