import Nav from "../../components/Nav";
import Sidebar from "../../components/Sidebar";
import MyAccount from "../../components/views/MyAccount/MyAccount";
import Wrapper from "../../components/views/Wrapper";
import Head from "next/head"

import { getSession } from "next-auth/react"
export default function IndexPage({ session }) {
  return (
    <Wrapper session={session}>
      <Head>
        <title>AgriWay: My Account </title>
      </Head>
      <MyAccount />
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
      destination: "/"
    }
  }
  return returnObj
}