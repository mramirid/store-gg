import ErrorIlustration from "components/ErrorIlustration";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const NotFound: NextPage = () => (
  <>
    <Head>
      <title>Not Found &ndash; StoreGG</title>
    </Head>

    <main className="mx-auto pt-145 pb-md-212 pb-100">
      <div className="container-fluid">
        <div className="text-center">
          <ErrorIlustration className="img-fluid" />
        </div>
        <div className="pt-70 pb-50">
          <h1 className="text-4xl fw-bold text-center color-palette-1 mb-10">
            Oops! Not Found
          </h1>
          <p className="text-lg text-center color-palette-1 m-0">
            The page you visited is not
            <br className="d-sm-block d-none" />
            available on our website
          </p>
        </div>
        <div className="button-group d-flex flex-column mx-auto">
          <Link href="/" className="text-decoration-none">
            <button className="btn btn-homepage w-100 fw-medium text-lg text-white rounded-pill">
              Homepage
            </button>
          </Link>
        </div>
      </div>
    </main>

    <style jsx>{`
      .btn-homepage {
        display: block;
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
