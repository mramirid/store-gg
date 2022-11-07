import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import CardIcon from "./CardIcon";
import LogoutIcon from "./LogoutIcon";
import MessagesIcon from "./MesssagesIcon";
import OverviewIcon from "./OverviewIcon";
import RewardsIcon from "./RewardsIcon";
import SettingsIcon from "./SettingsIcon";
import TransactionsIcon from "./TransactionsIcon";
import WinnerIcon from "./WinnerIcon";

export default function Sidebar() {
  return (
    <aside className="content pt-50 pb-30 ps-30">
      <Profile />

      <nav>
        <ul className="menus p-0 m-0">
          <MenuItem
            className="mb-30"
            Icon={OverviewIcon}
            label="Overview"
            href="/member"
            isActive
          />
          <MenuItem
            className="mb-30"
            Icon={TransactionsIcon}
            label="Transactions"
            href="/member/transactions"
            isActive={false}
          />
          <MenuItem
            className="mb-30"
            Icon={MessagesIcon}
            label="Messages"
            href="/member/messages"
            isActive={false}
          />
          <MenuItem
            className="mb-30"
            Icon={CardIcon}
            label="Card"
            href="/member/card"
            isActive={false}
          />
          <MenuItem
            className="mb-30"
            Icon={RewardsIcon}
            label="Rewards"
            href="/member/rewards"
            isActive={false}
          />
          <MenuItem
            className="mb-30"
            Icon={SettingsIcon}
            label="Settings"
            href="/member/edit-profile"
            isActive={false}
          />
          <MenuItem
            className="mb-30"
            Icon={LogoutIcon}
            label="Log Out"
            href="/member/logout"
            isActive={false}
          />
        </ul>
      </nav>

      <Footer />

      <style jsx>{`
        .content {
          background: #ffffff;
          width: 290px;
          position: relative;
          height: 100vh;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 9;
          overflow-y: auto;
        }

        .content::-webkit-scrollbar {
          display: none;
        }

        @media (min-height: 900px) {
          .content {
            overflow-y: hidden;
          }
        }
      `}</style>
    </aside>
  );
}

function Profile() {
  return (
    <header className="user text-center pb-50 pe-30">
      <Image
        src="/images/avatar-1.jpg"
        width={90}
        height={90}
        alt="Your avatar"
        className="mb-20 rounded-circle"
      />
      <h2 className="fw-bold text-xl color-palette-1 m-0">Harley Hanson</h2>
      <p className="color-palette-2 m-0">hanson@example.net</p>
    </header>
  );
}

function MenuItem(props: {
  className: string;
  Icon: FC;
  label: string;
  href: string;
  isActive: boolean;
}) {
  return (
    <>
      <li className={classNames({ active: props.isActive }, props.className)}>
        <props.Icon />
        <Link href={props.href} className="m-0 text-lg text-decoration-none">
          <span className="label">{props.label}</span>
        </Link>
      </li>

      <style jsx>{`
        li {
          display: flex;
          align-items: center;
          position: relative;
        }

        li.active .label,
        li:hover .label {
          color: #0c145a;
          font-weight: 500;
        }

        li.active > svg path,
        li:hover > svg path {
          transition: all 0.2s linear;
          stroke: #4d17e2;
        }

        li.active::after {
          content: " ";
          border: 2px solid #00baff;
          border-radius: 999px;
          width: 0px;
          height: 100%;
          position: absolute;
          background-color: #00baff;
          right: 0;
          transition: all 0.2s linear;
        }

        .label {
          color: #7e8cac;
          transition: all 0.2s linear;
        }
      `}</style>
    </>
  );
}

function Footer() {
  return (
    <footer className="pt-73 pe-30">
      <div className="footer-card">
        <div className="d-flex justify-content-between mb-20">
          <WinnerIcon />
          <p className="fw-medium color-palette-1">
            Top Up &amp;
            <br />
            Be The Winner
          </p>
        </div>
        <Link href="/#feature">
          <button className="btn btn-get-started w-100 fw-medium text-xs text-center text-white rounded-pill">
            Get Started
          </button>
        </Link>
      </div>

      <style jsx>{`
        .footer-card {
          background-color: #f9faff;
          border-radius: 1rem;
          padding: 20px;
        }

        .btn-get-started {
          background-color: #4d17e2;
          padding: 0.438rem;
        }
      `}</style>
    </footer>
  );
}
