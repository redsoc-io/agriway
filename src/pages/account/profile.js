import Nav from "../../components/Nav";
import Sidebar from "../../components/Sidebar";
import MyProfile from "../../components/views/MyAccount/MyProfile/MyProfile";
import { getSession } from "next-auth/react";
import Wrapper from "../../components/views/Wrapper";
import Head from "next/head"

export default function IndexPage({ session }) {
  return (
    <Wrapper session={session}>
      <Head>
        <title>AgriWay: Profile</title>
      </Head>
      <MyProfile session={session} />
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
