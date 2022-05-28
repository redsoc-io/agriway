import Head from "next/head";
import Image from "next/image";
import Nav from "../../components/Nav";
import Sidebar from "../../components/Sidebar";
import Wallet from "../../components/views/MyAccount/Wallet/Wallet";
import { getSession } from "next-auth/react";
import Wrapper from "../../components/views/Wrapper";

export default function IndexPage({ session }) {
  return (
    <Wrapper session={session}>
      <Head>
        <title>AgriWay: Wallet </title>
      </Head>
      <Wallet />
    </Wrapper>
  );
}


export async function getServerSideProps(ctx) {
  const session = await getSession(ctx)
  var returnObj = {
    props: { session },
  }
  if (!session) {
    returnObj.redirect = {
      permanent: false,
      destination: "/?login"
    }
  }
  return returnObj
}