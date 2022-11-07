import Footer from "components/Footer";
import Navbar from "components/Navbar";
import {
  Feature,
  FeaturedGames,
  Hero,
  Statistics,
  Story,
} from "features/homepage";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => (
  <>
    <Head>
      <title>Home - StoreGG</title>
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
