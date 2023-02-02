import type { NextPage } from "next";
import React from "react";

interface Props {
  styles?: string;
  children: React.ReactNode;
}

export const Container: NextPage<Props> = ({ children, styles }) => {
  return <div className={`custom-container ${styles}`}>{children}</div>;
};