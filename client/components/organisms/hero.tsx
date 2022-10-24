import Image from "next/image";
import { SVGProps } from "react";

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
              <a
                className="btn-learn text-lg color-palette-1 my-auto text-center"
                href="#"
                role="button"
              >
                Learn More
              </a>
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
            src="/images/header-1.png"
            className="img-fluid"
            alt=""
            priority
            width={490}
            height={484}
          />
          <div className="card left-card position-absolute border-0">
            <div className="d-flex align-items-center mb-16 gap-3">
              <Image
                src="/images/avatar-1.jpg"
                width={40}
                height={40}
                className="rounded-pill"
                alt=""
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
                src="/images/avatar-2.jpg"
                className="rounded-pill"
                alt=""
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

function StarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={24}
      height={22}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11.049.927c.3-.921 1.603-.921 1.902 0l1.968 6.056a1 1 0 0 0 .95.69h6.368c.969 0 1.372 1.24.588 1.81l-5.151 3.742a1 1 0 0 0-.364 1.119l1.968 6.055c.3.921-.755 1.688-1.539 1.118l-5.151-3.742a1 1 0 0 0-1.176 0l-5.151 3.742c-.784.57-1.838-.197-1.539-1.118l1.968-6.056a1 1 0 0 0-.364-1.118l-5.15-3.742c-.785-.57-.382-1.81.587-1.81H8.13a1 1 0 0 0 .951-.69L11.05.927Z"
        fill="#FEBD57"
      />
    </svg>
  );
}
