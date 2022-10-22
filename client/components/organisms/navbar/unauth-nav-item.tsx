import Link from "next/link";

export default function UnauthNavItem() {
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
