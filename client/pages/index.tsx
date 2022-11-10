import type { NextPage } from "next";
import Head from "next/head";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import {
  Feature,
  FeaturedGames,
  Hero,
  Statistics,
  Story,
} from "../features/homepage";

const Home: NextPage = () => (
  <>
    <Head>
      <title>Home &ndash; StoreGG</title>
    </Head>

    <header>
      <Navbar />
    </header>

    <main>
      <Hero />
      <Feature />
      <FeaturedGames />
      <Statistics />
      <Story />
    </main>

    <Footer />
  </>
);

export default Home;
