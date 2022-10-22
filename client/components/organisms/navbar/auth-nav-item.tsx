import classnames from "classnames";
import Image from "next/image";
import Link from "next/link";

export default function AuthNavItem() {
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
