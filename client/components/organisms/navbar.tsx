import classnames from "classnames";
import Image from "next/image";
import Link from "next/link";

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
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto text-lg gap-lg-0 gap-2">
              <NavItem href="/" isActive>
                Home
              </NavItem>
              <NavItem href="/404">Games</NavItem>
              <NavItem href="/404">Rewards</NavItem>
              <NavItem href="/404">Discover</NavItem>
              <NavItem href="/404">Global Rank</NavItem>
              <li className="nav-item my-auto">
                <Link href="/sign-in">
                  <a
                    className="btn btn-sign-in d-flex justify-content-center rounded-pill ms-lg-4"
                    role="button"
                  >
                    Sign In
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <style jsx>{`
        .navbar-light .btn-sign-in {
          color: #0c145a;
          background-color: #e7eaf5;
          padding: 0.75rem 1.875rem !important;
        }
      `}</style>
    </header>
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
