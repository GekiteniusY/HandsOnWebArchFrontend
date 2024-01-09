import Head from "next/head";
import React from "react";

interface HeaderProps {
  // children: React.ReactNode;
  title: string;
}

const CmpHeader: React.FC<HeaderProps> = ({ title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
    </>
  );
};

export default CmpHeader;
