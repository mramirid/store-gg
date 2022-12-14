import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import {
  Feature,
  FeaturedGame,
  FeaturedGames,
  Hero,
  Statistics,
  Story,
} from "../features/homepage";
import { toError } from "../utils/error";
import { resolveApiEndpointURL, resolveApiImageURL } from "../utils/format";

type Props = {
  featuredGames: FeaturedGame[];
};

const Home: NextPage<Props> = ({ featuredGames }) => (
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
      <FeaturedGames featuredGames={featuredGames} />
      <Statistics />
      <Story />
    </main>

    <Footer />
  </>
);

export default Home;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const response = await fetch(resolveApiEndpointURL("/homepage"));
  const data = await response.json();
  if (!response.ok) {
    throw toError(data);
  }

  const { vouchers } = data as ResponseData;
  const featuredGames = vouchers.map<FeaturedGame>((voucher) => ({
    id: voucher._id,
    name: voucher.name,
    imageUrl: resolveApiImageURL(voucher.imageName),
    category: voucher.category.name,
  }));

  return {
    props: { featuredGames },
  };
};

type ResponseData = {
  vouchers: Array<{
    _id: string;
    name: string;
    imageName: string;
    category: {
      _id: string;
      name: string;
    };
  }>;
};
