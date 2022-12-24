import classNames from "classnames";
import type { Transaction } from "features/transaction";
import { capitalize, isFunction } from "lodash-es";
import Image from "next/image";
import { formatIDR, resolveApiImageURL } from "utils/format";

type RenderAction = (transactionId: string) => JSX.Element;

export default function LatestTransactions(props: {
  renderAction?: RenderAction;
  transactions: Transaction[];
}) {
  return (
    <section>
      <h2 className="text-lg fw-medium color-palette-1 mb-14">
        Latest Transactions
      </h2>

      <div className="main-content-table overflow-auto">
        <table className="table table-borderless">
          <thead>
            <tr className="color-palette-1">
              <th scope="col">Voucher</th>
              <th scope="col">Nominal</th>
              <th scope="col">Price</th>
              <th scope="col">Status</th>
              {isFunction(props.renderAction) && <th scope="col">Action</th>}
            </tr>
          </thead>
          <tbody>
            {props.transactions.map((transaction) => {
              return (
                <TransactionRow
                  key={transaction._id}
                  id={transaction._id}
                  voucherImageUrl={resolveApiImageURL(
                    transaction.voucher.imageName
                  )}
                  voucherName={transaction.voucher.name}
                  category={transaction.category.name}
                  nominalQuantity={transaction.nominal.quantity}
                  nominalName={transaction.nominal.name}
                  totalPrice={transaction.totalPrice}
                  status={transaction.status}
                  renderAction={props.renderAction}
                />
              );
            })}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .main-content-table {
          background-color: #ffffff;
          padding: 1.25rem 1.875rem;
          border-radius: 1rem;
        }

        table thead tr th {
          font-weight: 400;
        }
      `}</style>
    </section>
  );
}

function TransactionRow(props: {
  id: string;
  voucherImageUrl: string;
  voucherName: string;
  category: string;
  nominalQuantity: number;
  nominalName: string;
  totalPrice: number;
  status: Transaction["status"];
  renderAction: RenderAction | undefined;
}) {
  const action = props.renderAction?.(props.id);

  return (
    <tr className="align-middle">
      <th scope="row">
        <div className="voucher-image-wrapper float-start me-3 mb-lg-0 mb-3">
          <Image
            src={props.voucherImageUrl}
            width={80}
            height={60}
            alt={props.voucherName}
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="voucher-title-header">
          <p className="voucher-title fw-medium text-start color-palette-1 m-0">
            {props.voucherName}
          </p>
          <p className="text-xs fw-normal text-start color-palette-2 m-0">
            {props.category}
          </p>
        </div>
      </th>
      <td>
        <p className="fw-medium color-palette-1 m-0">
          {props.nominalQuantity} {props.nominalName}
        </p>
      </td>
      <td>
        <p className="fw-medium text-start color-palette-1 m-0">
          {formatIDR(props.totalPrice)}
        </p>
      </td>
      <td>
        <div>
          <span
            className={classNames("float-start icon-status", {
              "bg-success": props.status === "accepted",
              "bg-danger": props.status === "rejected",
              "bg-warning": props.status === "paying",
              "bg-info": props.status === "verifying",
            })}
          />
          <p className="fw-medium text-start color-palette-1 m-0 position-relative">
            {capitalize(props.status)}
          </p>
        </div>
      </td>
      <td>{action}</td>

      <style jsx>{`
        .table > :not(caption) > * > * {
          padding: 10px 0px;
        }

        .voucher-image-wrapper {
          border-radius: 1rem;
          overflow: hidden;
        }

        .voucher-title-header {
          margin-top: 10px;
          margin-bottom: 10px;
        }

        .voucher-title {
          white-space: nowrap;
          width: 135px;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .icon-status {
          width: 6px;
          height: 6px;
          border-radius: 999px;
          margin: 9px 6px 0px 0px;
        }
      `}</style>
    </tr>
  );
}
