import InputErrorMessage from "components/InputErrorMessage";
import TextInput from "components/TextInput";
import { useJwt } from "features/auth";
import { StatusCodes } from "http-status-codes";
import { useRouter } from "next/router";
import { forwardRef } from "react";
import { Controller, useForm, UseFormRegisterReturn } from "react-hook-form";
import { toast } from "react-toastify";
import {
  ErrorWithMessage,
  getErrorMessage,
  isErrorWithMessage,
} from "utils/error";
import { formatIDR, resolveApiEndpointURL } from "utils/format";
import styles from "./CheckoutForm.module.css";

type CheckoutFormValues = {
  nominalId: string;
  paymentMethod: {
    id: string;
    bankId: string;
  };
  member: {
    bankAccountName: string;
    gameId: string;
  };
};

export default function CheckoutForm(props: {
  voucherId: string;
  nominals: Nominal[];
  paymentMethods: PaymentMethod[];
}) {
  const router = useRouter();

  const form = useForm<CheckoutFormValues>();

  const setFormErrors = (errors: Record<string, ErrorWithMessage>) => {
    if (isErrorWithMessage(errors["member.bankAccountName"])) {
      form.setError("member.bankAccountName", {
        type: "onChange",
        message: errors["member.bankAccountName"].message,
      });
    }
    if (isErrorWithMessage(errors["member.gameId"])) {
      form.setError("member.gameId", {
        type: "onChange",
        message: errors["member.gameId"].message,
      });
    }
  };

  const jwt = useJwt();

  const submitHandler = async (formValues: CheckoutFormValues) => {
    const reqBody = JSON.stringify({
      voucherId: props.voucherId,
      nominalId: formValues.nominalId,
      paymentMethodId: formValues.paymentMethod.id,
      bankId: formValues.paymentMethod.bankId,
      member: {
        bankAccountName: formValues.member.bankAccountName,
        gameId: formValues.member.gameId,
      },
    });

    let response: Response;
    try {
      response = await fetch(resolveApiEndpointURL("/transactions"), {
        method: "post",
        body: reqBody,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt.token}`,
        },
      });
    } catch (_) {
      toast.error("Failed to checkout. Try again.");
      return;
    }

    const resBody = await response.json();

    if (!response.ok) {
      toast.error(getErrorMessage(resBody));

      if (response.status === StatusCodes.UNPROCESSABLE_ENTITY) {
        setFormErrors(resBody.cause.errors);
      }
      return;
    }

    toast.success(resBody.message);
    router.replace(`/checkout/${resBody.transactionId}`);
    form.reset();
  };

  return (
    <form onSubmit={form.handleSubmit(submitHandler)}>
      <div className="pt-md-50 pt-30">
        <TextInput
          {...form.register("member.gameId")}
          type="text"
          label="Game ID"
          id="gameID"
          aria-describedby="gameID"
          placeholder="Enter your ID"
          error={form.formState.errors.member?.gameId}
        />
      </div>
      <div className="pt-md-50 pb-md-50 pt-30 pb-20">
        <p className="text-lg fw-medium color-palette-1 mb-md-10 mb-0">
          Nominal Top Up
        </p>
        <InputErrorMessage
          className="my-2"
          error={form.formState.errors.nominalId}
        />
        <div className="row justify-content-between">
          {props.nominals.map((nominal) => (
            <NominalInputRadio
              {...form.register("nominalId", {
                required: { value: true, message: "Select a top-up nominal" },
              })}
              key={nominal._id}
              nominal={nominal}
            />
          ))}
          <div className="col-lg-4 col-sm-6" />
        </div>
      </div>
      <div className="pb-md-50 pb-20">
        <p className="text-lg fw-medium color-palette-1 mb-md-10 mb-0">
          Payment Method
        </p>
        <InputErrorMessage
          className="my-2"
          error={form.formState.errors.paymentMethod}
        />
        <fieldset id="paymentMethod">
          <div className="row justify-content-between">
            <Controller
              control={form.control}
              name="paymentMethod"
              rules={{
                required: { value: true, message: "Select a payment method" },
              }}
              render={({ field }) => (
                <>
                  {props.paymentMethods.map((paymentMethod) => {
                    const id = `${paymentMethod._id}-${paymentMethod.bank._id}`;
                    return (
                      <PaymentMethodInputRadio
                        key={id}
                        id={id}
                        name={field.name}
                        paymentMethod={paymentMethod}
                        onSelect={() => {
                          field.onChange({
                            id: paymentMethod._id,
                            bankId: paymentMethod.bank._id,
                          });
                        }}
                      />
                    );
                  })}
                </>
              )}
            />
            <div className="col-lg-4 col-sm-6" />
          </div>
        </fieldset>
      </div>
      <div className="pb-50">
        <TextInput
          {...form.register("member.bankAccountName")}
          type="text"
          label="Bank Account Name"
          id="bankAccountName"
          aria-describedby="bankAccountName"
          placeholder="Enter your bank account name"
          error={form.formState.errors.member?.bankAccountName}
        />
      </div>
      <div className="d-sm-block d-flex flex-column w-100">
        <button
          className="btn btn-submit rounded-pill fw-medium text-white border-0 text-lg"
          type="submit"
          disabled={!jwt.hasToken}
        >
          Checkout
        </button>
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
};

const NominalInputRadio = forwardRef<
  HTMLInputElement,
  { nominal: Nominal } & UseFormRegisterReturn
>(function NominalInputRadio({ nominal, ...props }, ref) {
  return (
    <label
      className="col-lg-4 col-sm-6 ps-md-15 pe-md-15 pt-md-15 pb-md-15 pt-10 pb-10"
      htmlFor={nominal._id}
    >
      <input
        className="d-none"
        type="radio"
        id={nominal._id}
        defaultValue={nominal._id}
        ref={ref}
        name={props.name}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
      <div className={styles["radioCard"]}>
        <div className="d-flex justify-content-between">
          <p className="text-3xl color-palette-1 m-0">
            <span className="fw-medium">{nominal.quantity}</span> {nominal.name}
          </p>
          <RadioCheckIcon />
        </div>
        <p className="text-lg color-palette-1 m-0">
          {formatIDR(nominal.price)}
        </p>
      </div>
    </label>
  );
});

export type PaymentMethod = {
  _id: string;
  name: string;
  bank: {
    _id: string;
    name: string;
  };
};

function PaymentMethodInputRadio(props: {
  id: string;
  name: string;
  paymentMethod: PaymentMethod;
  onSelect: () => void;
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
        name={props.name}
        defaultValue={props.id}
        onChange={props.onSelect}
      />
      <div className={styles["radioCard"]}>
        <div className="d-flex justify-content-between">
          <p className="text-3xl color-palette-1 fw-medium m-0">
            {props.paymentMethod.name}
          </p>
          <RadioCheckIcon />
        </div>
        <p className="text-lg color-palette-1 m-0">
          {props.paymentMethod.bank.name}
        </p>
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
