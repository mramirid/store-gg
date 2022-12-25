import classNames from "classnames";
import type { Transaction } from "features/transaction";
import { capitalize } from "lodash-es";
import Image from "next/image";
import { resolveApiImageURL } from "utils/format";

export default function TransactionVoucherDetails(props: {
  imageName: string;
  name: string;
  category: string;
  status: Transaction["status"];
}) {
  return (
    <section className="d-flex flex-row  align-items-center justify-content-between mb-30">
      <div className="d-flex flex-row align-items-center">
        <div className="pe-4">
          <div className="cropped">
            <Image
              className="img-fluid"
              src={resolveApiImageURL(props.imageName)}
              width={281}
              height={381}
              alt={props.name}
            />
          </div>
        </div>
        <div>
          <p className="fw-bold text-xl color-palette-1 mb-10">{props.name}</p>
          <p className="color-palette-2 m-0">Category: {props.category}</p>
        </div>
      </div>
      <div>
        <p
          className={classNames(
            "fw-medium text-center label m-0 rounded-pill",
            props.status
          )}
        >
          {capitalize(props.status)}
        </p>
      </div>

      <style jsx>{`
        .label {
          width: 130px;
          padding: 0.5rem;
        }

        .label.paying {
          color: #febd57;
          background-color: #ffeed3;
        }

        .label.success {
          color: #1abc9c;
          background-color: #b8e9df;
        }

        .label.rejected {
          color: #fe5761;
          background-color: #ffc6c9;
        }

        .label.verifying {
          color: #17a2b8;
          background-color: #bffbff;
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
