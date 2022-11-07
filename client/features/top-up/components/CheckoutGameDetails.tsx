import Image from "next/image";

export default function CheckoutGameDetails() {
  return (
    <div className="d-flex flex-row align-items-center pt-md-50 pb-md-50 pt-30 pb-30">
      <div className="pe-4">
        <div className="img-wrapper">
          <Image
            src="/images/game-3.png"
            width={281}
            height={381}
            className="img-fluid"
            alt=""
          />
        </div>
      </div>
      <div>
        <h2 className="fw-bold text-xl color-palette-1 mb-10">
          Mobile Legends:
          <br /> The New Battle 2021
        </h2>
        <p className="color-palette-2 m-0">Category: Mobile</p>
      </div>

      <style jsx>{`
        .img-wrapper {
          position: relative;
          width: 110px;
          height: 140px;
          overflow: hidden;
          border-radius: 1.625rem;
        }

        .img-wrapper img {
          margin: -10px 0px 0px 0px;
        }

        /* Medium devices (landscape phones, 768px and up) */
        @media (min-width: 768px) {
          .img-wrapper {
            width: 200px;
            height: 130px;
          }
        }
      `}</style>
    </div>
  );
}
