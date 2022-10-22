import classnames from "classnames";
import Image from "next/image";
import Link from "next/link";

const isLoggedIn = true;

export default function Navbar() {
  return (
    <header>
      <nav
        className={classnames(
          "navbar navbar-expand-lg navbar-light bg-light bg-white pt-lg-40",
          "pb-lg-40 pt-30 pb-50"
        )}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" href="/">
            <a>
              <Image src="/icons/logo.svg" width={60} height={60} alt="Logo" />
            </a>
          </Link>
          <ToggleMenu />
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto text-lg gap-lg-0 gap-2">
              <NavItem href="/" isActive>
                Home
              </NavItem>
              <NavItem href="/404">Games</NavItem>
              <NavItem href="/404">Rewards</NavItem>
              <NavItem href="/404">Discover</NavItem>
              <NavItem href="/404">Global Rank</NavItem>
              {isLoggedIn ? <AuthNavItem /> : <UnauthNavItem />}
            </ul>
          </div>
        </div>
      </nav>
    </header>
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
      <Link href={props.href}>
        <a
          className={classnames("nav-link", { active: props.isActive })}
          aria-current="page"
        >
          {props.children}
        </a>
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
          .nav-link {
            padding-right: 1.25rem !important;
            padding-left: 1.25rem !important;
          }
        }
      `}</style>
    </li>
  );
}

function AuthNavItem() {
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
          <Image
            src="/images/avatar-1.png"
            className="rounded-circle"
            width={40}
            height={40}
            alt=""
          />
        </a>
        <ul
          className="dropdown-menu border-0"
          aria-labelledby="dropdownMenuLink"
        >
          <DropdownItem href="/member" isActive>
            My Profile
          </DropdownItem>
          <DropdownItem href="/404">Wallet</DropdownItem>
          <DropdownItem href="/member/edit-profile">
            Account Settings
          </DropdownItem>
          <DropdownItem href="/sign-in">Log Out</DropdownItem>
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

function DropdownItem(props: {
  children: string;
  href: string;
  isActive?: boolean;
}) {
  return (
    <li>
      <Link href={props.href}>
        <a
          className={classnames("dropdown-item text-lg color-palette-2", {
            active: props.isActive,
          })}
        >
          {props.children}
        </a>
      </Link>

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
  return (
    <li className="nav-item my-auto">
      <Link href="/sign-in">
        <a
          className="btn btn-sign-in d-flex justify-content-center rounded-pill ms-lg-4"
          role="button"
        >
          Sign In
        </a>
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
