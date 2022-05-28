import Head from "next/head";
import Image from "next/image";
import Premium from "../../components/views/MyAccount/Premium/Premium";
import { getSession } from "next-auth/react"
import Wrapper from "../../components/views/Wrapper";

export default function IndexPage({ session }) {
  return (

    <Wrapper session={session}>
      <Head>
        <title>AgriWay: Premium </title>
      </Head>
      <Premium />
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