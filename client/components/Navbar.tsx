import classnames from "classnames";
import { useJwt } from "features/auth";
import { isString } from "lodash-es";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import EmptyAvatarIcon from "./EmptyAvatarIcon";
import LogoIcon from "./LogoIcon";

export default function Navbar() {
  const jwt = useJwt();

  return (
    <nav
      className={classnames(
        "navbar navbar-expand-lg navbar-light bg-light bg-white pt-lg-40",
        "pb-lg-40 pt-30 pb-50"
      )}
    >
      <div className="container-fluid">
        <Link
          className="navbar-brand"
          href="/"
          title="Homepage &ndash; StoreGG"
        >
          <LogoIcon />
        </Link>
        <ToggleMenu />
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto text-lg gap-lg-0 gap-2">
            <NavItem href="/" isActive>
              Home
            </NavItem>
            <NavItem href="/vouchers">Vouchers</NavItem>
            <NavItem href="/rewards">Rewards</NavItem>
            <NavItem href="/discover">Discover</NavItem>
            <NavItem href="/rank">Global Rank</NavItem>
            {jwt.hasToken ? <AuthNavItem /> : <UnauthNavItem />}
          </ul>
        </div>
      </div>
    </nav>
  );
}

function ToggleMenu() {
  return (
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
  );
}

function NavItem(props: {
  children: string;
  href: string;
  isActive?: boolean;
}) {
  return (
    <li className="nav-item my-auto">
      <Link
        href={props.href}
        className={classnames("nav-link", { active: props.isActive })}
        aria-current="page"
      >
        <span className="nav-link__label">{props.children}</span>
      </Link>

      <style jsx>{`
        .nav-link.active,
        .show > .nav-link {
          font-weight: 500;
          color: #0c145a;
        }

        .nav-link:hover {
          color: #0c145a;
        }

        .nav-link {
          color: #7e8cac;
        }

        /* Large devices (desktops, 992px and up) */
        @media (min-width: 992px) {
          .nav-link__label {
            padding-right: 1.25rem;
            padding-left: 1.25rem;
          }
        }
      `}</style>
    </li>
  );
}

function AuthNavItem() {
  const { payload } = useJwt();
  const avatarUrl = payload?.avatarUrl;

  const router = useRouter();

  const jwt = useJwt();

  const logoutHandler = () => {
    jwt.removeToken();
    router.replace("/");
  };

  return (
    <li className="nav-item my-auto dropdown d-flex">
      <div className="vertical-line d-lg-block d-none ms-lg-4" />
      <div>
        <a
          className="dropdown-toggle ms-lg-40"
          href="#"
          role="button"
          id="dropdownMenuLink"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {isString(avatarUrl) ? (
            <Image
              src={avatarUrl}
              className="rounded-circle"
              width={40}
              height={40}
              alt="Your avatar"
            />
          ) : (
            <EmptyAvatarIcon
              className="rounded-circle"
              width={40}
              height={40}
            />
          )}
        </a>
        <ul
          className="dropdown-menu border-0"
          aria-labelledby="dropdownMenuLink"
        >
          <DropdownItem type="link" href="/dashboard">
            My Profile
          </DropdownItem>
          <DropdownItem type="link" href="/dashboard/wallet">
            Wallet
          </DropdownItem>
          <DropdownItem type="link" href="/dashboard/edit-profile">
            Account Settings
          </DropdownItem>
          <DropdownItem type="button" onClick={logoutHandler}>
            Sign Out
          </DropdownItem>
        </ul>
      </div>

      <style jsx>{`
        .dropdown-toggle::after {
          display: none;
        }

        .dropdown-menu {
          right: 0;
          left: auto;
          padding-top: 0.75rem;
          padding-bottom: 0.75rem;
          margin-top: 1.25rem;
          min-width: 210px;
        }

        ul.dropdown-menu {
          border-radius: 1rem;
          box-shadow: -8px 8px 58px 0px rgba(0, 0, 0, 0.1);
        }

        /* Large devices (desktops, 992px and up) */
        @media (min-width: 992px) {
          .vertical-line {
            border: 1px solid rgba(231, 234, 245, 1);
            height: 40px;
          }
        }
      `}</style>
    </li>
  );
}

type DropdownItemLinkProps = {
  type: "link";
  href: string;
  isActive?: boolean;
};

type DropdownItemButtonProps = {
  type: "button";
  onClick: () => void;
};

function DropdownItem(
  props: (DropdownItemLinkProps | DropdownItemButtonProps) & {
    children: string;
  }
) {
  let clickable: JSX.Element;
  const baseClassName = "dropdown-item text-lg color-palette-2";
  switch (props.type) {
    case "link":
      clickable = (
        <Link
          href={props.href}
          className={classnames(baseClassName, {
            active: props.isActive,
          })}
        >
          {props.children}
        </Link>
      );
      break;
    case "button":
      clickable = (
        <button className={baseClassName} onClick={props.onClick}>
          {props.children}
        </button>
      );
      break;
    default:
      throw new TypeError("Unknown type");
  }

  return (
    <li>
      {clickable}

      <style jsx>{`
        .dropdown-item {
          transition: 0.2s;
          padding: 0.5rem 1.25rem;
        }

        .dropdown-item:focus,
        .dropdown-item:hover {
          color: #4d17e2;
          text-decoration: underline;
          background-color: transparent;
        }
      `}</style>
    </li>
  );
}

function UnauthNavItem() {
  const jwt = useJwt();

  return (
    <li className="nav-item my-auto">
      <Link href="/sign-in" className="text-decoration-none">
        <button className="btn btn-sign-in d-flex justify-content-center rounded-pill ms-lg-4">
          {jwt.isReady ? "Sign In" : "Loading"}
        </button>
      </Link>

      <style jsx>{`
        .btn-sign-in {
          color: #0c145a;
          background-color: #e7eaf5;
          padding: 0.75rem 1.875rem !important;
        }
      `}</style>
    </li>
  );
}
