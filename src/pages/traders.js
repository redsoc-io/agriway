import Traders from "../components/views/Traders/Traders";
import { getSession } from "next-auth/react";
import Wrapper from "../components/views/Wrapper";
import Head from "next/head"

export default function IndexPage({ session }) {
    return (
        <Wrapper session={session}>
            <Head>
                <title>AgriWay: Traders </title>
            </Head>
            <Traders />
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