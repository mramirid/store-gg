import { formatIDR } from "utils/format";

export default function TransactionPurchaseDetails() {
  return (
    <>
      <section className="purchase pt-30">
        <h2 className="fw-bold text-xl color-palette-1 mb-20">
          Purchase Details
        </h2>
        <p className="text-lg color-palette-1 mb-20">
          Your Game ID <span className="purchase-details">masayoshizero</span>
        </p>
        <p className="text-lg color-palette-1 mb-20">
          Order ID <span className="purchase-details">#GG001</span>
        </p>
        <p className="text-lg color-palette-1 mb-20">
          Item <span className="purchase-details">250 Diamonds</span>
        </p>
        <p className="text-lg color-palette-1 mb-20">
          Price{" "}
          <span className="purchase-details">{formatIDR(42_280_500)}</span>
        </p>
        <p className="text-lg color-palette-1 mb-20">
          Tax (10%){" "}
          <span className="purchase-details">{formatIDR(4_228_000)}</span>
        </p>
        <p className="text-lg color-palette-1 mb-20">
          Total{" "}
          <span className="purchase-details color-palette-4">
            {formatIDR(55_000_600)}
          </span>
        </p>
      </section>

      <section className="payment pt-10 pb-10">
        <h2 className="fw-bold text-xl color-palette-1 mb-20">
          Payment Informations
        </h2>
        <p className="text-lg color-palette-1 mb-20">
          Your Account Name{" "}
          <span className="purchase-details">Masayoshi Angga Zero</span>
        </p>
        <p className="text-lg color-palette-1 mb-20">
          Type <span className="payment-details">Worldwide Transfer</span>
        </p>
        <p className="text-lg color-palette-1 mb-20">
          Bank Name <span className="payment-details">Mandiri</span>
        </p>
        <p className="text-lg color-palette-1 mb-20">
          Bank Account Name{" "}
          <span className="payment-details">PT Store GG Indonesia</span>
        </p>
        <p className="text-lg color-palette-1 mb-20">
          Bank Number{" "}
          <span className="payment-details">1800 - 9090 - 2021</span>
        </p>
      </section>

      <style jsx>{`
        .purchase-details,
        .payment-details {
          display: block;
          font-weight: 500;
        }

        @media (min-width: 768px) {
          .purchase-details,
          .payment-details {
            float: right;
          }
        }
      `}</style>
    </>
  );
}
