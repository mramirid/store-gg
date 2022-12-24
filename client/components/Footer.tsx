import Link from "next/link";
import LogoIcon from "./LogoIcon";

export default function Footer() {
  const currentYear = new Date().getUTCFullYear();

  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-4 text-lg-start text-center">
            <Link
              href="/"
              className="d-block lh-1 mb-30"
              title="Homepage &ndash; StoreGG"
            >
              <LogoIcon />
            </Link>
            <p className="mt-30 text-lg color-palette-1 mb-30">
              StoreGG membantu gamers
              <br /> untuk menjadi pemenang sejati
            </p>
            <p className="mt-30 text-lg color-palette-1 mb-30">
              Copyright {currentYear}. All Rights Reserved.
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
                  { label: "About Us", href: "/about" },
                  { label: "Press Release", href: "/releases" },
                  { label: "Terms of Use", href: "/terms" },
                  { label: "Privacy & Policy", href: "/privacy" },
                ]}
              />
              <NavItem
                title="Support"
                links={[
                  { label: "Refund Policy", href: "/refund" },
                  { label: "Unlock Rewards", href: "/rewards" },
                  { label: "Live Chatting", href: "/chatting" },
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
  links: Array<{
    label: string;
    href: string;
    isExternal?: boolean;
  }>;
}) {
  return (
    <section>
      <h2 className="text-lg fw-semibold color-palette-1 mb-12">
        {props.title}
      </h2>
      <ul className="list-unstyled">
        {props.links.map((link, i) => (
          <li className="mb-6" key={i}>
            <Link
              href={link.href}
              className="text-lg color-palette-1 text-decoration-none"
              target={link.isExternal ? "_blank" : undefined}
              rel={link.isExternal ? "noopener noreferrer" : undefined}
            >
              {link.label}
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
    </section>
  );
}
