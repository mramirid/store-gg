import Link from "next/link";
import { useRouter } from "next/router";

export function CheckoutConfirmation() {
  const router = useRouter();

  const { id: thisGameId } = router.query;

  return (
    <>
      <label className="checkbox-label text-lg color-palette-1">
        I have transferred the money
        <input type="checkbox" />
        <span className="checkmark" />
      </label>
      <div className="d-md-block d-flex flex-column w-100 pt-50">
        <Link href={`/games/${thisGameId}/checkout-completed`}>
          <a
            className="btn btn-confirm-payment rounded-pill fw-medium text-white border-0 text-lg"
            role="button"
          >
            Confirm Payment
          </a>
        </Link>
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
