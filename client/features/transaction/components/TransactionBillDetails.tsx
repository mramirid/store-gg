import { formatIDR } from "utils/format";

export default function TransactionBillDetails(props: {
  memberGameId: string;
  transactionId: string;
  nominalQuantity: number;
  nominalName: string;
  nominalPrice: number;
  taxRate: number;
  totalPrice: number;
  bankAccountName: string;
  paymentMethod: string;
  targetBankName: string;
  targetBankHolderName: string;
  targetBankHolderNumbers: string;
}) {
  return (
    <>
      <section className="purchase pt-30">
        <h2 className="fw-bold text-xl color-palette-1 mb-20">
          Purchase Details
        </h2>
        <p className="text-lg color-palette-1 mb-20">
          Your Game ID{" "}
          <span className="purchase-details">{props.memberGameId}</span>
        </p>
        <p className="text-lg color-palette-1 mb-20">
          Order ID{" "}
          <span className="purchase-details">#{props.transactionId}</span>
        </p>
        <p className="text-lg color-palette-1 mb-20">
          Item{" "}
          <span className="purchase-details">
            {props.nominalQuantity} {props.nominalName}
          </span>
        </p>
        <p className="text-lg color-palette-1 mb-20">
          Price{" "}
          <span className="purchase-details">
            {formatIDR(props.nominalPrice)}
          </span>
        </p>
        <p className="text-lg color-palette-1 mb-20">
          Tax ({props.taxRate * 100}%){" "}
          <span className="purchase-details">
            {formatIDR(props.nominalPrice * props.taxRate)}
          </span>
        </p>
        <p className="text-lg color-palette-1 mb-20">
          Total{" "}
          <span className="purchase-details color-palette-4">
            {formatIDR(props.totalPrice)}
          </span>
        </p>
      </section>

      <section className="payment pt-10 pb-10">
        <h2 className="fw-bold text-xl color-palette-1 mb-20">
          Payment Informations
        </h2>
        <p className="text-lg color-palette-1 mb-20">
          Your Account Name{" "}
          <span className="purchase-details">{props.bankAccountName}</span>
        </p>
        <p className="text-lg color-palette-1 mb-20">
          Type <span className="payment-details">{props.paymentMethod}</span>
        </p>
        <p className="text-lg color-palette-1 mb-20">
          Bank Name{" "}
          <span className="payment-details">{props.targetBankName}</span>
        </p>
        <p className="text-lg color-palette-1 mb-20">
          Bank Account Name{" "}
          <span className="payment-details">{props.targetBankHolderName}</span>
        </p>
        <p className="text-lg color-palette-1 mb-20">
          Bank Number{" "}
          <span className="payment-details">
            {props.targetBankHolderNumbers}
          </span>
        </p>
      </section>

      <style jsx>{`
        .purchase-details,
        .payment-details {
          display: block;
          font-weight: 500;
        }

        /* Medium devices (landscape phones, 768px and up) */
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
