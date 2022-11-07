import Footer from "components/organisms/footer";
import Navbar from "components/organisms/navbar";
import TopUpGame from "components/organisms/top-up-game";
import TopUpForm from "components/organisms/top-up-form";
import { NextPage } from "next";
import Head from "next/head";

const TopUp: NextPage = () => (
  <>
    <Head>
      <title>Topup GAME_NAME - StoreGG</title>
    </Head>

    <Navbar />

    <main className="pt-lg-60 pb-100">
      <div className="container-xxl container-fluid">
        <div className="detail-header pb-50">
          <h1 className="text-4xl fw-bold color-palette-1 text-start mb-10">
            Top Up
          </h1>
          <p className="text-lg color-palette-1 mb-0">
            Perkuat akun dan jadilah pemenang
          </p>
        </div>
        <div className="row">
          <div className="col-xl-3 col-lg-4 col-md-5 pb-30 pb-md-0 pe-md-25 text-md-start">
            <TopUpGame forMobile />
          </div>
          <div className="col-xl-9 col-lg-8 col-md-7 ps-md-25">
            <TopUpGame />
            <hr />
            <TopUpForm />
          </div>
        </div>
      </div>
    </main>

    <Footer />

    <style jsx>{`
      hr {
        margin: 0;
        background-color: #e7eaf5;
        border: 0;
        opacity: 1;
      }
    `}</style>
  </>
);

export default TopUp;
