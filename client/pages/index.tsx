import type { NextPage } from "next";
import Head from "next/head";
import Feature from "../components/organisms/feature";
import FeaturedGames from "../components/organisms/featured-games";
import Footer from "../components/organisms/footer";
import Hero from "../components/organisms/hero";
import Navbar from "../components/organisms/navbar";
import Reached from "../components/organisms/reached";
import Story from "../components/organisms/story";

const Home: NextPage = () => (
  <>
    <Head>
      <title>Home - StoreGG</title>
    </Head>

    <Navbar />
    <main>
      <Hero />
      <Feature />
      <FeaturedGames />
      <Reached />
      <Story />
    </main>
    <Footer />
  </>
);

export default Home;
