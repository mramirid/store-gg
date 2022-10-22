import classnames from "classnames";
import Image from "next/image";
import Link from "next/link";
import AuthNavItem from "./auth-nav-item";
import NavItem from "./nav-item";
import ToggleMenu from "./toggle-menu";
import UnauthNavItem from "./unauth-nav-item";

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
