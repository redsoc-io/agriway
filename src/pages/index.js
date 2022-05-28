import Home from "../components/views/Home/Home";
import { getSession } from "next-auth/react"
import Wrapper from "../components/views/Wrapper";
import { useEffect } from "react";
import Head from "next/head"
import SupervisorHome from "../components/views/Home/SupervisorHome";

export default function IndexPage({ session }) {
  return (
    <Wrapper session={session}>
      <Head>
        <title>AgriWay: Home </title>
      </Head>
      {
        session && (
          <>
            {JSON.parse(session.token.sub).role === "s" && <SupervisorHome />}
            {JSON.parse(session.token.sub).role === "u" && <Home />}
          </>
        )
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