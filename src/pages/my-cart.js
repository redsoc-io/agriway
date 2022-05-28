import Head from "next/head";
import Image from "next/image";
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";
import MyCart from "../components/views/MyCart/MyCart";
import { getSession } from "next-auth/react"
import Wrapper from "../components/views/Wrapper";



export default function IndexPage({ session }) {

    return (
        <Wrapper session={session}>
            <Head>
                <title>AgriWay: My Cart</title>
            </Head>
            <MyCart />
        </Wrapper>
    );
}

export async function getServerSideProps(ctx) {
    const session = await getSession(ctx)
    var returnObj = {
        props: { session },
    }
    return returnObj
}