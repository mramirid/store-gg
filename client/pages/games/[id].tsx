import GameDetails from "components/organisms/game-details";
import TopUpForm from "components/organisms/top-up-form";
import { NextPage } from "next";
import Head from "next/head";

const GameDetailsPage: NextPage = () => (
  <>
    <Head>
      <title>Details</title>
    </Head>

    <section className="pt-lg-60 pb-50">
      <div className="container-xxl container-fluid">
        <div className="detail-header pb-50">
          <h2 className="text-4xl fw-bold color-palette-1 text-start mb-10">
            Top Up
          </h2>
          <p className="text-lg color-palette-1 mb-0">
            Perkuat akun dan jadilah pemenang
          </p>
        </div>
        <div className="row">
          <div className="col-xl-3 col-lg-4 col-md-5 pb-30 pb-md-0 pe-md-25 text-md-start">
            <GameDetails />
          </div>
          <div className="col-xl-9 col-lg-8 col-md-7 ps-md-25">
            <GameDetails forDesktop />
            <hr />
            <TopUpForm />
          </div>
        </div>
      </div>
    </section>

    <style jsx>{`
      .img-wrapper {
        border-radius: 1.625rem;
        overflow: hidden;
      }

      hr {
        margin: 0;
        background-color: #e7eaf5;
        border: 0;
        opacity: 1;
      }
    `}</style>
  </>
);

export default GameDetailsPage;
