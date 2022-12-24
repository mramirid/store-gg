import { useJwt } from "features/auth";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import { getErrorMessage } from "utils/error";
import { resolveApiEndpointURL } from "utils/format";

export default function CheckoutConfirmation(props: { transactionId: string }) {
  const [hasTransferred, setHasTransferred] = useState(false);

  const router = useRouter();

  const jwt = useJwt();

  const confirmPayment = async () => {
    if (!hasTransferred) {
      return;
    }

    let response: Response;
    try {
      response = await fetch(
        resolveApiEndpointURL(
          `/transactions/${props.transactionId}/confirm-payment`
        ),
        {
          method: "PATCH",
          headers: { Authorization: `Bearer ${jwt.token}` },
        }
      );
    } catch (_) {
      toast.error("Failed to confirm the payment. Try again.");
      return;
    }

    const resBody = await response.json();

    if (!response.ok) {
      toast.error(getErrorMessage(resBody));
      return;
    }

    toast.success(resBody.message);
    router.replace(`/checkout/${props.transactionId}/completed`);
  };

  return (
    <>
      <label className="checkbox-label text-lg color-palette-1">
        I have transferred the money
        <input
          type="checkbox"
          onChange={() => setHasTransferred(!hasTransferred)}
        />
        <span className="checkmark" />
      </label>
      <div className="d-md-block d-flex flex-column w-100 pt-50">
        <button
          className="btn btn-confirm-payment rounded-pill fw-medium text-white border-0 text-lg"
          onClick={confirmPayment}
          disabled={!hasTransferred}
        >
          Confirm Payment
        </button>
      </div>

      <style jsx>{`
        .checkbox-label {
          display: block;
          position: relative;
          padding-left: 35px;
          cursor: pointer;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }

        .checkbox-label input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
          height: 0;
          width: 0;
        }

        .checkmark {
          transition: all 0.06s linear;
          position: absolute;
          top: 3px;
          left: 0;
          height: 22px;
          width: 22px;
          border-radius: 0.375rem;
          border: 2px solid #0c145a;
        }

        .checkbox-label input:checked ~ .checkmark {
          background-color: #ffffff;
          border: 2px solid #00baff;
        }

        .checkmark:after {
          content: "";
          position: absolute;
          display: none;
        }

        .checkbox-label input:checked ~ .checkmark:after {
          display: block;
        }

        .checkbox-label .checkmark:after {
          width: 14px;
          height: 14px;
          background-color: #00baff;
          border-radius: 0.25rem;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }

        .btn-confirm-payment {
          padding: 0.75rem 2.875rem;
          background-color: #4d17e2;
        }
      `}</style>
    </>
  );
}
