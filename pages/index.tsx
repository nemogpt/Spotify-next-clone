import type { NextPage, NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Main from "../components/Main";
import Player from "../components/Player";
import Sidebar from "../components/Sidebar";

const Home: NextPage = () => {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <Head>
        <title>Spotify</title>
      </Head>
      <main className="flex">
        <Sidebar />
        <Main />
      </main>
      <div className="sticky bottom-0">
        <Player />
      </div>
    </div>
  );
};

export default Home;

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
