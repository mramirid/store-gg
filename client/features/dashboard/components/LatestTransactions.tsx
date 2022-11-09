import classNames from "classnames";
import { capitalize, isFunction } from "lodash-es";
import Image from "next/image";
import { formatIDR } from "utils/format";

type RenderAction = (transactionId: string) => JSX.Element;

export default function LatestTransactions(props: {
  renderAction?: RenderAction;
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
              <th scope="col">Game</th>
              <th scope="col">Item</th>
              <th scope="col">Price</th>
              <th scope="col">Status</th>
              {isFunction(props.renderAction) && <th scope="col">Action</th>}
            </tr>
          </thead>
          <tbody>
            <TransactionRow
              id={"crypto.randomUUID()"}
              gameImageUrl={require("../assets/game-1.png")}
              gameName="Mobile Legends: The New Battle 2021"
              gameCategory="Desktop"
              itemQuantity={200}
              itemName="Gold"
              price={290_000}
              status="pending"
              renderAction={props.renderAction}
            />
            <TransactionRow
              id={"crypto.randomUUID()"}
              gameImageUrl={require("../assets/game-2.png")}
              gameName="Call of Duty:Modern"
              gameCategory="Desktop"
              itemQuantity={550}
              itemName="Gold"
              price={740_000}
              status="success"
              renderAction={props.renderAction}
            />
            <TransactionRow
              id={"crypto.randomUUID()"}
              gameImageUrl={require("../assets/game-3.png")}
              gameName="Clash of Clans"
              gameCategory="Mobile"
              itemQuantity={100}
              itemName="Gold"
              price={120_000}
              status="failed"
              renderAction={props.renderAction}
            />
            <TransactionRow
              id={"crypto.randomUUID()"}
              gameImageUrl={require("../assets/game-4.png")}
              gameName="The Royal Game"
              gameCategory="Mobile"
              itemQuantity={225}
              itemName="Gold"
              price={200_000}
              status="pending"
              renderAction={props.renderAction}
            />
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
  gameImageUrl: string;
  gameName: string;
  gameCategory: string;
  itemQuantity: number;
  itemName: string;
  price: number;
  status: "success" | "pending" | "failed";
  renderAction: RenderAction | undefined;
}) {
  const action = props.renderAction?.(props.id);

  return (
    <tr className="align-middle">
      <th scope="row">
        <div className="float-start me-3 mb-lg-0 mb-3">
          <Image src={props.gameImageUrl} width={80} height={60} alt="" />
        </div>
        <div className="game-title-header">
          <p className="game-title fw-medium text-start color-palette-1 m-0">
            {props.gameName}
          </p>
          <p className="text-xs fw-normal text-start color-palette-2 m-0">
            {props.gameCategory}
          </p>
        </div>
      </th>
      <td>
        <p className="fw-medium color-palette-1 m-0">
          {props.itemQuantity} {props.itemName}
        </p>
      </td>
      <td>
        <p className="fw-medium text-start color-palette-1 m-0">
          {formatIDR(props.price)}
        </p>
      </td>
      <td>
        <div>
          <span
            className={classNames("float-start icon-status", props.status)}
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

        .game-title-header {
          margin-top: 10px;
          margin-bottom: 10px;
        }

        .game-title {
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

        .icon-status.pending {
          background-color: #febd57;
        }

        .icon-status.success {
          background-color: #1abc9c;
        }

        .icon-status.failed {
          background-color: #fe5761;
        }
      `}</style>
    </tr>
  );
}
