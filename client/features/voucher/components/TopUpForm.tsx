import Link from "next/link";
import { useRouter } from "next/router";
import { formatIDR } from "../../../utils/format";
import styles from "./TopUpForm.module.css";

export type PaymentMethod = {
  _id: string;
  name: string;
  bank: {
    _id: string;
    name: string;
  };
};

export default function TopUpForm(props: {
  nominals: Nominal[];
  paymentMethods: PaymentMethod[];
}) {
  const router = useRouter();

  const { id: thisVoucherId } = router.query;

  return (
    <form action="./checkout.html" method="POST">
      <div className="pt-md-50 pt-30">
        <label
          htmlFor="ID"
          className="form-label text-lg fw-medium color-palette-1 mb-10"
        >
          Verify ID
        </label>
        <input
          type="text"
          className="form-control rounded-pill text-lg"
          id="ID"
          name="ID"
          aria-describedby="verifyID"
          placeholder="Enter your ID"
        />
      </div>
      <div className="pt-md-50 pb-md-50 pt-30 pb-20">
        <p className="text-lg fw-medium color-palette-1 mb-md-10 mb-0">
          Nominal Top Up
        </p>
        <div className="row justify-content-between">
          {props.nominals.map((nominal) => (
            <NominalInputRadio
              key={nominal._id}
              _id={nominal._id}
              name={nominal.name}
              price={nominal.price}
              quantity={nominal.quantity}
              onSelect={() => {}}
            />
          ))}
          <div className="col-lg-4 col-sm-6" />
        </div>
      </div>
      <div className="pb-md-50 pb-20">
        <p className="text-lg fw-medium color-palette-1 mb-md-10 mb-0">
          Payment Method
        </p>
        <fieldset id="paymentMethod">
          <div className="row justify-content-between">
            {props.paymentMethods.map((paymentMethod) => {
              const id = `${paymentMethod._id}-${paymentMethod.bank._id}`;
              return (
                <PaymentMethodInputRadio
                  key={id}
                  id={id}
                  name={paymentMethod.name}
                  bankId={paymentMethod.bank._id}
                  bankName={paymentMethod.bank.name}
                  onSelect={() => {}}
                />
              );
            })}
            <div className="col-lg-4 col-sm-6" />
          </div>
        </fieldset>
      </div>
      <div className="pb-50">
        <label
          htmlFor="bankAccount"
          className="form-label text-lg fw-medium color-palette-1 mb-10"
        >
          Bank Account Name
        </label>
        <input
          type="text"
          className="form-control rounded-pill text-lg"
          id="bankAccount"
          name="bankAccount"
          aria-describedby="bankAccount"
          placeholder="Enter your Bank Account Name"
        />
      </div>
      <div className="d-sm-block d-flex flex-column w-100">
        <Link href={`/vouchers/${thisVoucherId}/checkout`}>
          <button
            type="submit"
            className="btn btn-submit rounded-pill fw-medium text-white border-0 text-lg"
          >
            Continue
          </button>
        </Link>
      </div>

      <style jsx>{`
        input[type="text"] {
          max-width: 437px;
          border: 1px solid #0c145a;
          padding: 0.75rem 1.625rem;
          color: #0c145a;
        }

        input[type="text"]:focus-within {
          color: #0c145a;
        }

        input[type="text"]::placeholder {
          color: #ccd0dd;
        }

        .btn-submit {
          background-color: #4d17e2;
          padding: 0.75rem 3rem;
        }
      `}</style>
    </form>
  );
}

export type Nominal = {
  _id: string;
  name: string;
  quantity: number;
  price: number;
  onSelect: (id: string) => void;
};

function NominalInputRadio(props: Nominal) {
  return (
    <label
      className="col-lg-4 col-sm-6 ps-md-15 pe-md-15 pt-md-15 pb-md-15 pt-10 pb-10"
      htmlFor={props._id}
    >
      <input
        className="d-none"
        type="radio"
        id={props._id}
        name="nominal"
        defaultValue={props._id}
        onChange={() => props.onSelect(props._id)}
      />
      <div className={styles["radioCard"]}>
        <div className="d-flex justify-content-between">
          <p className="text-3xl color-palette-1 m-0">
            <span className="fw-medium">{props.quantity}</span> {props.name}
          </p>
          <RadioCheckIcon />
        </div>
        <p className="text-lg color-palette-1 m-0">{formatIDR(props.price)}</p>
      </div>
    </label>
  );
}

function PaymentMethodInputRadio(props: {
  id: string;
  name: string;
  bankId: string;
  bankName: string;
  onSelect: (paymentMethodId: string, bankId: string) => void;
}) {
  return (
    <label
      className="col-lg-4 col-sm-6 ps-md-15 pe-md-15 pt-md-15 pb-md-15 pt-10 pb-10"
      htmlFor={props.id}
    >
      <input
        className="d-none"
        type="radio"
        id={props.id}
        name="paymentMethod"
        defaultValue={props.id}
        onChange={() => props.onSelect(props.id, props.bankId)}
      />
      <div className={styles["radioCard"]}>
        <div className="d-flex justify-content-between">
          <p className="text-3xl color-palette-1 fw-medium m-0">{props.name}</p>
          <RadioCheckIcon />
        </div>
        <p className="text-lg color-palette-1 m-0">{props.bankName}</p>
      </div>
    </label>
  );
}

function RadioCheckIcon() {
  return (
    <svg
      id={styles["checkIcon"]}
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx={10} cy={10} r={10} fill="#CDF1FF" />
      <path
        d="M5.83301 10L8.46459 12.5L14.1663 7.5"
        stroke="#00BAFF"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
