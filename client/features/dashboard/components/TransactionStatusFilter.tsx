import classNames from "classnames";
import type { Transaction } from "features/transaction";
import { isString } from "lodash-es";
import Link from "next/link";
import { useRouter } from "next/router";
import type { UrlObject } from "url";

export default function TransactionStatusFilter(props: {
  status: Transaction["status"] | undefined;
  label: string;
}) {
  const href: UrlObject = isString(props.status)
    ? { query: { status: props.status } }
    : {};

  const { query } = useRouter();

  return (
    <>
      <Link data-filter="*" href={href}>
        <span
          className={classNames("btn btn-status rounded-pill text-sm me-3", {
            "btn-active": query["status"] === props.status,
          })}
        >
          {props.label}
        </span>
      </Link>

      <style jsx>{`
        .btn {
          display: inline-block;
          width: 112px;
          padding: 0.563rem;
        }

        .btn-status.btn-active {
          color: #ffffff;
          background-color: #0c145a;
        }

        .btn-status {
          color: #0c145a;
          background-color: #e7eaf5;
        }
      `}</style>
    </>
  );
}
