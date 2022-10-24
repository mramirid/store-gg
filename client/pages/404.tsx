import Page404Ilustration from "components/atoms/page-404-ilustration";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const NotFound: NextPage = () => (
  <>
    <Head>
      <title>Not Found - StoreGG</title>
    </Head>

    <main className="mx-auto pt-145 pb-md-212 pb-100">
      <div className="container-fluid">
        <div className="text-center">
          <Page404Ilustration className="img-fluid" />
        </div>
        <div className="pt-70 pb-50">
          <h1 className="text-4xl fw-bold text-center color-palette-1 mb-10">
            Oops! Not Found
          </h1>
          <p className="text-lg text-center color-palette-1 m-0">
            Halaman yang anda kunjungi sudah
            <br className="d-sm-block d-none" />
            tidak tersedia pada sistem kami dan menghubungi
          </p>
        </div>
        <div className="button-group d-flex flex-column mx-auto">
          <Link href="/">
            <a
              className="btn btn-homepage fw-medium text-lg text-white rounded-pill"
              role="button"
            >
              Homepage
            </a>
          </Link>
        </div>
      </div>
    </main>

    <style jsx>{`
      .btn-homepage {
        padding: 0.75rem;
        background-color: #4d17e2;
      }

      @media (min-width: 768px) {
        .button-group {
          width: 190px;
        }
      }
    `}</style>
  </>
);

export default NotFound;
