import classnames from "classnames";
import Link from "next/link";

export default function NavItem(props: {
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
