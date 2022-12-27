import Footer from "components/Footer";
import Navbar from "components/Navbar";
import {
  Feature,
  FeaturedVouchers,
  Hero,
  Statistics,
  Story,
  TFeaturedVoucher,
} from "features/homepage";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { toError } from "utils/error";
import { resolveApiEndpointURL, resolveApiImageURL } from "utils/format";

type Props = {
  featuredVouchers: TFeaturedVoucher[];
};

const PAGE_DESC =
  "Kami menyediakan jutaan cara untuk membantu players menjadi pemenang sejati";

const THIS_BASE_URL = process.env["NEXT_PUBLIC_THIS_BASE_URL"];

const Home: NextPage<Props> = ({ featuredVouchers }) => (
  <>
    <Head>
      <title>Home &ndash; StoreGG</title>
      <meta name="description" content={PAGE_DESC} />

      <meta
        property="og:title"
        content="StoreGG - Topup & Get a New Experience in Gaming"
      />
      <meta property="og:description" content={PAGE_DESC} />
      <meta
        property="og:image"
        content={THIS_BASE_URL + "/images/hero-banner.png"}
      />
      <meta property="og:url" content={THIS_BASE_URL} />
    </Head>

    <header>
      <Navbar />
    </header>

    <main>
      <Hero />
      <Feature />
      <FeaturedVouchers vouchers={featuredVouchers} />
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
  const featuredVouchers = vouchers.map<TFeaturedVoucher>((voucher) => ({
    id: voucher._id,
    name: voucher.name,
    imageUrl: resolveApiImageURL(voucher.imageName),
    category: voucher.category.name,
  }));

  return {
    props: { featuredVouchers },
    revalidate: 86_400, // every 24 hours
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
