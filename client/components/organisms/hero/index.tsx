import Ilustration from "./ilustration";

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
          <Ilustration />
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
