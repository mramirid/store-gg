import Image from "next/image";

export default function TransactionGameDetails() {
  return (
    <section className="d-flex flex-row  align-items-center justify-content-between mb-30">
      <div className="game-checkout d-flex flex-row align-items-center">
        <div className="pe-4">
          <div className="cropped">
            <Image
              className="img-fluid"
              src={require("../../homepage/assets/game-3.png")}
              width={281}
              height={381}
              alt=""
            />
          </div>
        </div>
        <div>
          <p className="fw-bold text-xl color-palette-1 mb-10">
            Mobile Legends:
            <br /> The New Battle 2021
          </p>
          <p className="color-palette-2 m-0">Category: Mobile</p>
        </div>
      </div>
      <div>
        <p className="fw-medium text-center label pending m-0 rounded-pill">
          Pending
        </p>
      </div>

      <style jsx>{`
        .label {
          width: 130px;
          padding: 0.5rem;
        }

        .label.pending {
          color: #febd57;
          background-color: #ffeed3;
        }

        .label.success {
          color: #1abc9c;
          background-color: #b8e9df;
        }

        .label.failed {
          color: #fe5761;
          background-color: #ffc6c9;
        }

        .img-fluid {
          max-width: 100%;
          height: auto;
          border-radius: 1.625rem;
        }

        .cropped {
          position: relative;
          width: 110px;
          height: 140px;
          overflow: hidden;
          border-radius: 1.625rem;
        }

        @media (min-width: 768px) {
          .cropped {
            width: 200px;
            height: 130px;
            overflow: hidden;
            border-radius: 1.625rem;
          }
        }
      `}</style>
    </section>
  );
}
