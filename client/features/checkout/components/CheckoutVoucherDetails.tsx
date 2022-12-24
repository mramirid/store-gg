import Image from "next/image";
import { resolveApiImageURL } from "utils/format";

export default function CheckoutVoucherDetails(props: {
  voucherName: string;
  voucherImageName: string;
  categoryName: string;
}) {
  return (
    <div className="d-flex flex-row align-items-center pt-md-50 pb-md-50 pt-30 pb-30">
      <div className="pe-4">
        <div className="img-wrapper">
          <Image
            src={resolveApiImageURL(props.voucherImageName)}
            width={281}
            height={381}
            className="img-fluid"
            alt={props.voucherName}
          />
        </div>
      </div>
      <div>
        <h2 className="fw-bold text-xl color-palette-1 mb-10">
          {props.voucherName}
        </h2>
        <p className="color-palette-2 m-0">Category: {props.categoryName}</p>
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
