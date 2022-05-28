import Home from "../components/views/Home/Home";
import { getSession } from "next-auth/react"
import Wrapper from "../components/views/Wrapper";
import Head from "next/head"

export default function IndexPage({ session }) {
  return (
    <Wrapper session={session}>
      <Head>
        <title>AgriWay: Home </title>
      </Head>
      {
        session && JSON.parse(session.token.sub).role === "s" ? <h1 className="text-center w-full text-3xl py-6">Welcome Supervisor!</h1> : <Home />
      }
    </Wrapper>
  );
}

export async function getServerSideProps(ctx) {
  return {
    props: {
      session: await getSession(ctx)
    }
  }
}