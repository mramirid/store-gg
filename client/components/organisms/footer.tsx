import Link from "next/link";
import Logo from "../../public/icons/logo.svg";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-4 text-lg-start text-center">
            <Link href="/">
              <a className="d-block lh-1 mb-30" title="Homepage - StoreGG">
                <Logo />
              </a>
            </Link>
            <p className="mt-30 text-lg color-palette-1 mb-30">
              StoreGG membantu gamers
              <br /> untuk menjadi pemenang sejati
            </p>
            <p className="mt-30 text-lg color-palette-1 mb-30">
              Copyright 2021. All Rights Reserved.
            </p>
          </div>
          <div className="col-lg-8 mt-lg-0 mt-20">
            <nav
              className="d-flex flex-wrap justify-content-md-between flex-md-nowrap"
              style={{ columnGap: "3rem", rowGap: "3.125rem" }}
            >
              <NavItem
                title="Company"
                links={[
                  { label: "About Us", href: "/404" },
                  { label: "Press Release", href: "/404" },
                  { label: "Terms of Use", href: "/404" },
                  { label: "Privacy & Policy", href: "/404" },
                ]}
              />
              <NavItem
                title="Support"
                links={[
                  { label: "Refund Policy", href: "/404" },
                  { label: "Unlock Rewards", href: "/404" },
                  { label: "Live Chatting", href: "/404" },
                ]}
              />
              <NavItem
                title="Connect"
                links={[
                  {
                    label: "mramirid@store.gg",
                    href: "mailto:mramirid@store.gg",
                    isExternal: true,
                  },
                  {
                    label: "team@store.gg",
                    href: "mailto:team@store.gg",
                    isExternal: true,
                  },
                  {
                    label: "Koridor, Surabaya",
                    href: "https://goo.gl/maps/mk4UWPkKKpFDZxAEA",
                    isExternal: true,
                  },
                  {
                    label: "021 - 1122 - 9090",
                    href: "tel:+622111229090",
                    isExternal: true,
                  },
                ]}
              />
            </nav>
          </div>
        </div>
      </div>

      <style jsx>{`
        footer {
          padding-top: 5rem;
          padding-bottom: 5rem;
          background-color: #f9faff;
        }
      `}</style>
    </footer>
  );
}

function NavItem(props: {
  title: string;
  links: {
    label: string;
    href: string;
    isExternal?: boolean;
  }[];
}) {
  return (
    <div>
      <p className="text-lg fw-semibold color-palette-1 mb-12">{props.title}</p>
      <ul className="list-unstyled">
        {props.links.map((link, i) => (
          <li className="mb-6" key={i}>
            <Link href={link.href}>
              <a
                className="text-lg color-palette-1 text-decoration-none"
                target={link.isExternal ? "_blank" : undefined}
                rel={link.isExternal ? "noopener noreferrer" : undefined}
              >
                {link.label}
              </a>
            </Link>
          </li>
        ))}
      </ul>

      <style jsx>{`
        ul {
          margin-bottom: 0;
        }

        ul li a {
          transition: 0.2s;
        }

        ul li a:hover {
          color: #4d17e2;
          text-decoration: underline !important;
          background-color: transparent;
        }
      `}</style>
    </div>
  );
}
