import classNames from "classnames";
import EmptyAvatarIcon from "components/EmptyAvatarIcon";
import WinnerIcon from "components/WinnerIcon";
import { useJwt } from "features/auth";
import { isString } from "lodash-es";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Sidebar() {
  const jwt = useJwt();

  return (
    <aside className="content pt-50 pb-30 ps-30">
      <Profile />

      <nav>
        <ul className="menus p-0 m-0">
          <MenuItem
            className="mb-30"
            Icon={OverviewIcon}
            label="Overview"
            type="link"
            href="/dashboard"
          />
          <MenuItem
            className="mb-30"
            Icon={TransactionsIcon}
            label="Transactions"
            type="link"
            href="/dashboard/transactions"
          />
          <MenuItem
            className="mb-30"
            Icon={MessagesIcon}
            label="Messages"
            type="link"
            href="/dashboard/messages"
          />
          <MenuItem
            className="mb-30"
            Icon={CardIcon}
            label="Card"
            type="link"
            href="/dashboard/card"
          />
          <MenuItem
            className="mb-30"
            Icon={RewardsIcon}
            label="Rewards"
            type="link"
            href="/dashboard/rewards"
          />
          <MenuItem
            className="mb-30"
            Icon={SettingsIcon}
            label="Settings"
            type="link"
            href="/dashboard/edit-profile"
          />
          <MenuItem
            className="mb-30"
            Icon={LogoutIcon}
            type="button"
            label="Sign Out"
            onClick={jwt.removeToken}
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
  const { payload } = useJwt();

  return (
    <header className="user text-center pb-50 pe-30">
      {isString(payload?.avatarUrl) ? (
        <Image
          src={payload?.avatarUrl as string}
          width={90}
          height={90}
          alt="Your avatar"
          className="mb-20 rounded-circle"
        />
      ) : (
        <EmptyAvatarIcon
          className="mb-20 rounded-circle"
          width={90}
          height={90}
        />
      )}
      <h2 className="fw-bold text-xl color-palette-1 m-0">
        {payload?.fullName}
      </h2>
      <p className="color-palette-2 m-0">{payload?.email}</p>
    </header>
  );
}

type MenuItemLinkProps = {
  type: "link";
  href: string;
};

type MenuItemButtonProps = {
  type: "button";
  onClick: () => void;
};

function MenuItem(
  props: (MenuItemLinkProps | MenuItemButtonProps) & {
    className: string;
    Icon: React.FC;
    label: string;
  }
) {
  const router = useRouter();

  let href: string;
  let isActive: boolean;
  let onClick: () => void;
  switch (props.type) {
    case "link":
      href = props.href;
      isActive = router.pathname === props.href;
      onClick = () => {};
      break;
    case "button":
      href = "#";
      isActive = false;
      onClick = props.onClick;
      break;
    default:
      throw new TypeError("Unknown type");
  }

  return (
    <>
      <li className={classNames(props.className, { active: isActive })}>
        <props.Icon />
        <Link
          href={href}
          className="m-0 text-lg text-decoration-none"
          onClick={onClick}
        >
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
          <WinnerIcon width={50} height={50} />
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

function OverviewIcon() {
  return (
    <svg
      className="icon me-3"
      width={25}
      height={25}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.9033 14.7502H14.9033V21.7502H21.9033V14.7502Z"
        stroke="#7E8CAC"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.9033 14.7502H3.90332V21.7502H10.9033V14.7502Z"
        stroke="#7E8CAC"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.9033 3.75024H14.9033V10.7502H21.9033V3.75024Z"
        stroke="#7E8CAC"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.9033 3.75024H3.90332V10.7502H10.9033V3.75024Z"
        stroke="#7E8CAC"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TransactionsIcon() {
  return (
    <svg
      className="icon me-3"
      width={25}
      height={25}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.90332 2.41406L3.90332 6.41406V20.4141C3.90332 20.9445 4.11403 21.4532 4.48911 21.8283C4.86418 22.2033 5.37289 22.4141 5.90332 22.4141H19.9033C20.4338 22.4141 20.9425 22.2033 21.3175 21.8283C21.6926 21.4532 21.9033 20.9445 21.9033 20.4141V6.41406L18.9033 2.41406H6.90332Z"
        stroke="#7E8CAC"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.9033 10.4141C16.9033 11.4749 16.4819 12.4923 15.7317 13.2425C14.9816 13.9926 13.9642 14.4141 12.9033 14.4141C11.8425 14.4141 10.825 13.9926 10.0749 13.2425C9.32475 12.4923 8.90332 11.4749 8.90332 10.4141"
        stroke="#7E8CAC"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.90332 6.41406H21.9033"
        stroke="#7E8CAC"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MessagesIcon() {
  return (
    <svg
      className="icon me-3"
      width={25}
      height={25}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.9033 11.9141C21.9068 13.234 21.5984 14.536 21.0033 15.7141C20.2978 17.1258 19.2131 18.3133 17.8708 19.1434C16.5285 19.9735 14.9816 20.4135 13.4033 20.4141C12.0835 20.4175 10.7814 20.1092 9.60332 19.5141L3.90332 21.4141L5.80332 15.7141C5.20825 14.536 4.89988 13.234 4.90332 11.9141C4.90393 10.3358 5.34393 8.78894 6.17404 7.44664C7.00415 6.10434 8.19157 5.01966 9.60332 4.31409C10.7814 3.71902 12.0835 3.41065 13.4033 3.41409H13.9033C15.9877 3.52908 17.9564 4.40885 19.4325 5.88495C20.9086 7.36105 21.7883 9.32974 21.9033 11.4141V11.9141Z"
        stroke="#7E8CAC"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CardIcon() {
  return (
    <svg
      className="icon me-3"
      width={25}
      height={25}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0)">
        <path
          d="M21.9033 4.41406H3.90332C2.79875 4.41406 1.90332 5.30949 1.90332 6.41406V18.4141C1.90332 19.5186 2.79875 20.4141 3.90332 20.4141H21.9033C23.0079 20.4141 23.9033 19.5186 23.9033 18.4141V6.41406C23.9033 5.30949 23.0079 4.41406 21.9033 4.41406Z"
          stroke="#7E8CAC"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1.90332 10.4141H23.9033"
          stroke="#7E8CAC"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect
            width={24}
            height={24}
            fill="white"
            transform="translate(0.90332 0.414062)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

function RewardsIcon() {
  return (
    <svg
      className="icon me-3"
      width={25}
      height={25}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0)">
        <path
          d="M12.9033 15.4141C16.7693 15.4141 19.9033 12.2801 19.9033 8.41406C19.9033 4.54807 16.7693 1.41406 12.9033 1.41406C9.03733 1.41406 5.90332 4.54807 5.90332 8.41406C5.90332 12.2801 9.03733 15.4141 12.9033 15.4141Z"
          stroke="#7E8CAC"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.11332 14.3039L7.90332 23.4139L12.9033 20.4139L17.9033 23.4139L16.6933 14.2939"
          stroke="#7E8CAC"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect
            width={24}
            height={24}
            fill="white"
            transform="translate(0.90332 0.414062)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg
      className="icon me-3"
      width={25}
      height={25}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0)">
        <path
          d="M12.9033 15.4141C14.5602 15.4141 15.9033 14.0709 15.9033 12.4141C15.9033 10.7572 14.5602 9.41406 12.9033 9.41406C11.2465 9.41406 9.90332 10.7572 9.90332 12.4141C9.90332 14.0709 11.2465 15.4141 12.9033 15.4141Z"
          stroke="#7E8CAC"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20.3033 15.4141C20.1702 15.7157 20.1305 16.0503 20.1893 16.3747C20.2481 16.699 20.4028 16.9984 20.6333 17.2341L20.6933 17.2941C20.8793 17.4798 21.0268 17.7004 21.1274 17.9432C21.2281 18.186 21.2799 18.4462 21.2799 18.7091C21.2799 18.9719 21.2281 19.2321 21.1274 19.4749C21.0268 19.7177 20.8793 19.9383 20.6933 20.1241C20.5076 20.31 20.287 20.4575 20.0442 20.5582C19.8014 20.6588 19.5412 20.7106 19.2783 20.7106C19.0155 20.7106 18.7552 20.6588 18.5124 20.5582C18.2696 20.4575 18.0491 20.31 17.8633 20.1241L17.8033 20.0641C17.5676 19.8335 17.2683 19.6789 16.9439 19.6201C16.6195 19.5612 16.2849 19.6009 15.9833 19.7341C15.6876 19.8608 15.4353 20.0713 15.2576 20.3396C15.08 20.6079 14.9846 20.9223 14.9833 21.2441V21.4141C14.9833 21.9445 14.7726 22.4532 14.3975 22.8283C14.0225 23.2033 13.5138 23.4141 12.9833 23.4141C12.4529 23.4141 11.9442 23.2033 11.5691 22.8283C11.194 22.4532 10.9833 21.9445 10.9833 21.4141V21.3241C10.9756 20.9931 10.8684 20.6721 10.6758 20.4028C10.4832 20.1335 10.2141 19.9283 9.90332 19.8141C9.6017 19.6809 9.26713 19.6412 8.94273 19.7001C8.61834 19.7589 8.319 19.9135 8.08332 20.1441L8.02332 20.2041C7.83757 20.39 7.617 20.5375 7.3742 20.6382C7.1314 20.7388 6.87115 20.7906 6.60832 20.7906C6.34549 20.7906 6.08524 20.7388 5.84244 20.6382C5.59964 20.5375 5.37907 20.39 5.19332 20.2041C5.00737 20.0183 4.85985 19.7977 4.7592 19.5549C4.65855 19.3121 4.60675 19.0519 4.60675 18.7891C4.60675 18.5262 4.65855 18.266 4.7592 18.0232C4.85985 17.7804 5.00737 17.5598 5.19332 17.3741L5.25332 17.3141C5.48386 17.0784 5.63851 16.779 5.69732 16.4547C5.75614 16.1303 5.71644 15.7957 5.58332 15.4941C5.45656 15.1983 5.24608 14.946 4.97779 14.7684C4.7095 14.5907 4.39511 14.4953 4.07332 14.4941H3.90332C3.37289 14.4941 2.86418 14.2833 2.48911 13.9083C2.11403 13.5332 1.90332 13.0245 1.90332 12.4941C1.90332 11.9636 2.11403 11.4549 2.48911 11.0798C2.86418 10.7048 3.37289 10.4941 3.90332 10.4941H3.99332C4.32431 10.4863 4.64533 10.3792 4.91462 10.1866C5.18391 9.99397 5.38904 9.7248 5.50332 9.41406C5.63644 9.11245 5.67614 8.77787 5.61732 8.45347C5.55851 8.12908 5.40386 7.82974 5.17332 7.59406L5.11332 7.53406C4.92737 7.34832 4.77985 7.12774 4.6792 6.88494C4.57855 6.64215 4.52675 6.38189 4.52675 6.11906C4.52675 5.85623 4.57855 5.59598 4.6792 5.35318C4.77985 5.11039 4.92737 4.88981 5.11332 4.70406C5.29907 4.51811 5.51964 4.37059 5.76244 4.26994C6.00524 4.16929 6.26549 4.11749 6.52832 4.11749C6.79115 4.11749 7.0514 4.16929 7.2942 4.26994C7.537 4.37059 7.75757 4.51811 7.94332 4.70406L8.00332 4.76406C8.239 4.9946 8.53834 5.14925 8.86273 5.20807C9.18713 5.26689 9.5217 5.22718 9.82332 5.09406H9.90332C10.1991 4.9673 10.4513 4.75682 10.629 4.48853C10.8067 4.22024 10.902 3.90585 10.9033 3.58406V3.41406C10.9033 2.88363 11.114 2.37492 11.4891 1.99985C11.8642 1.62478 12.3729 1.41406 12.9033 1.41406C13.4338 1.41406 13.9425 1.62478 14.3175 1.99985C14.6926 2.37492 14.9033 2.88363 14.9033 3.41406V3.50406C14.9046 3.82585 15 4.14024 15.1776 4.40853C15.3553 4.67682 15.6076 4.8873 15.9033 5.01406C16.2049 5.14718 16.5395 5.18689 16.8639 5.12807C17.1883 5.06925 17.4876 4.9146 17.7233 4.68406L17.7833 4.62406C17.9691 4.43811 18.1896 4.29059 18.4324 4.18994C18.6752 4.08929 18.9355 4.03749 19.1983 4.03749C19.4612 4.03749 19.7214 4.08929 19.9642 4.18994C20.207 4.29059 20.4276 4.43811 20.6133 4.62406C20.7993 4.80981 20.9468 5.03039 21.0474 5.27318C21.1481 5.51598 21.1999 5.77623 21.1999 6.03906C21.1999 6.30189 21.1481 6.56215 21.0474 6.80494C20.9468 7.04774 20.7993 7.26832 20.6133 7.45406L20.5533 7.51406C20.3228 7.74974 20.1681 8.04908 20.1093 8.37347C20.0505 8.69787 20.0902 9.03245 20.2233 9.33406V9.41406C20.3501 9.70983 20.5606 9.96208 20.8289 10.1398C21.0971 10.3174 21.4115 10.4128 21.7333 10.4141H21.9033C22.4338 10.4141 22.9425 10.6248 23.3175 10.9998C23.6926 11.3749 23.9033 11.8836 23.9033 12.4141C23.9033 12.9445 23.6926 13.4532 23.3175 13.8283C22.9425 14.2033 22.4338 14.4141 21.9033 14.4141H21.8133C21.4915 14.4153 21.1771 14.5107 20.9089 14.6884C20.6406 14.866 20.4301 15.1183 20.3033 15.4141V15.4141Z"
          stroke="#7E8CAC"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect
            width={24}
            height={24}
            fill="white"
            transform="translate(0.90332 0.414062)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg
      className="icon me-3"
      width={25}
      height={25}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.2634 7.05396C20.5218 8.31274 21.3787 9.9164 21.7257 11.6621C22.0728 13.4079 21.8944 15.2173 21.2131 16.8617C20.5318 18.5061 19.3782 19.9115 17.8983 20.9003C16.4183 21.8891 14.6783 22.4169 12.8984 22.4169C11.1185 22.4169 9.37859 21.8891 7.89861 20.9003C6.41864 19.9115 5.26508 18.5061 4.58381 16.8617C3.90253 15.2173 3.72413 13.4079 4.07116 11.6621C4.41819 9.9164 5.27506 8.31274 6.53344 7.05396"
        stroke="#7E8CAC"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.9033 2.41406V12.4141"
        stroke="#7E8CAC"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
