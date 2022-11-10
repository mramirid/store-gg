import Image from "next/image";
import Link from "next/link";

export default function Story() {
  return (
    <section className="story pt-50 pb-100">
      <div className="container-xxl container-fluid">
        <div className="row align-items-center px-lg-5 mx-auto gap-lg-0 gap-4">
          <div
            className="col-lg-7 col-12 d-lg-flex d-none justify-content-lg-end pe-lg-60"
            data-aos="zoom-in"
          >
            <Image
              src="/images/story-banner.png"
              width={612}
              height={452}
              alt="Story banner"
            />
          </div>
          <div className="col-lg-5 col-12 ps-lg-60">
            <h2 className="text-4xl fw-bold color-palette-1 mb-30">
              Win the battle.
              <br /> Be the Champion.
            </h2>
            <p className="text-lg color-palette-1 mb-30">
              Kami menyediakan jutaan cara untuk
              <br className="d-sm-block d-none" />
              membantu players menjadi
              <br className="d-sm-block d-none" /> pemenang sejati
            </p>
            <div className="d-md-block d-flex flex-column w-100">
              <Link href="/stories">
                <button className="btn btn-read text-lg rounded-pill">
                  Read Story
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .btn-read {
          padding: 0.75rem 3rem;
          background-color: #e7eaf5;
        }
      `}</style>
    </section>
  );
}
