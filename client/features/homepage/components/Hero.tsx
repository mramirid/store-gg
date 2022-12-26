import Image from "next/image";
import Link from "next/link";
import avatar1 from "../assets/avatar-1.jpg";
import avatar2 from "../assets/avatar-2.jpg";

export default function Hero() {
  return (
    <section className="hero pt-lg-60 pb-50">
      <div className="container-xxl container-fluid">
        <div className="row gap-lg-0 gap-5">
          <div className="col-lg-6 col-12 my-auto">
            <p className="text-support text-lg color-palette-2">Halo gamers,</p>
            <h1 className="hero-title color-palette-1 fw-bold">
              Topup &amp; Get <span className="d-sm-inline d-none">a</span>
              <span className="d-sm-none d-inline">a</span>
              <span className="underline-blue"> New</span>{" "}
              <br className="d-sm-block d-none" />{" "}
              <span className="underline-blue">Experience</span> in Gaming
            </h1>
            <p className="mt-30 mb-40 text-lg color-palette-1">
              Kami menyediakan jutaan cara untuk membantu
              <br className="d-md-block d-none" /> players menjadi pemenang
              sejati
            </p>
            <div className="d-flex flex-lg-row flex-column gap-4">
              <a
                className="btn btn-get text-lg text-white rounded-pill"
                href="#feature"
                role="button"
              >
                Get Started
              </a>
              <Link
                className="btn-learn text-lg color-palette-1 my-auto text-center"
                href="/learn"
              >
                Learn More
              </Link>
            </div>
          </div>
          <Banner />
        </div>
      </div>

      <style jsx>{`
        .hero-title {
          font-size: 2.625rem;
          line-height: 1.5;
        }

        .btn-get {
          background-color: #4d17e2;
          padding: 0.75rem 3rem;
        }

        .btn-learn:hover {
          color: #0c145a;
        }

        /* Large devices (desktops, 992px and up) */
        @media (min-width: 992px) {
          .underline-blue {
            text-decoration: none;
            position: relative;
          }

          .underline-blue:after {
            position: absolute;
            content: "";
            height: 8px;
            bottom: 11px;
            margin: 0 auto;
            left: 0;
            right: 0;
            width: 100%;
            background: #00baff;
            z-index: -10;
          }
        }
      `}</style>
    </section>
  );
}

function Banner() {
  return (
    <div className="col-lg-6 col-12 d-lg-block d-none">
      <div className="d-flex justify-content-lg-end justify-content-center me-lg-5">
        <div className="position-relative" data-aos="zoom-in">
          <Image
            src="/images/hero-banner.png"
            className="img-fluid"
            alt="Hero banner"
            priority
            width={490}
            height={484}
          />
          <div className="card left-card position-absolute border-0">
            <div className="d-flex align-items-center mb-16 gap-3">
              <Image
                src={avatar1}
                width={40}
                height={40}
                className="rounded-pill"
                alt="Harley Hanson"
              />
              <div>
                <p className="text-sm fw-medium color-palette-1 m-0">
                  Harley Hanson
                </p>
                <p className="text-xs fw-light color-palette-2 m-0">
                  Professional Gamer
                </p>
              </div>
            </div>
            <div className="d-flex gap-2">
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
            </div>
          </div>
          <div className="card right-card position-absolute border-0">
            <div className="position-relative d-flex flex-row justify-content-center mb-24">
              <Image
                src={avatar2}
                className="rounded-pill"
                alt="Lann Knight"
                width={80}
                height={80}
              />
              <p className="right-card-support text-white text-xxs text-center position-absolute m-0">
                New
              </p>
            </div>
            <div>
              <p className="text-sm text-center m-0 fw-medium color-palette-1">
                Lann Knight
              </p>
              <p className="fw-light text-center m-0 color-palette-2 text-xs">
                Dota 2
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .card {
          border-radius: 1rem;
          box-shadow: -8px 8px 58px 0px rgba(0, 0, 0, 0.1);
        }

        .left-card {
          width: 207px;
          height: 112px;
          top: 6.68rem;
          left: -3.625rem;
          padding: 0.875rem;
        }

        .right-card {
          width: 135px;
          height: 177px;
          bottom: 6.5rem;
          right: -3.2rem;
          padding: 1.25rem 1.5rem;
        }

        .right-card-support {
          padding: 0.063rem 0.625rem;
          background-color: #00baff;
          width: max-content;
          border-radius: 0.375rem;
          bottom: -0.5rem;
          left: auto;
          right: auto;
        }
      `}</style>
    </div>
  );
}

function StarIcon() {
  return (
    <svg
      viewBox="231.206 122.962 21.505 20.546"
      xmlns="http://www.w3.org/2000/svg"
      width={25}
      height={25}
    >
      <path
        d="M241.048 123.624c.286-.882 1.534-.882 1.82 0l1.883 5.793a.955.955 0 0 0 .909.661h6.092c.927 0 1.312 1.186.562 1.73l-4.928 3.581a.957.957 0 0 0-.348 1.07l1.883 5.793c.286.882-.723 1.614-1.473 1.07l-4.927-3.581a.96.96 0 0 0-1.125 0l-4.928 3.581c-.75.544-1.759-.188-1.473-1.07l1.883-5.793a.957.957 0 0 0-.348-1.07l-4.928-3.581c-.75-.544-.364-1.73.563-1.73h6.091a.958.958 0 0 0 .91-.661l1.882-5.793Z"
        fill="#FEBD57"
      />
    </svg>
  );
}
