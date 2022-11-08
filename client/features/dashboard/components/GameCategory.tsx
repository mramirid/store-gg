import { useId } from "react";
import { formatIDR } from "utils/format";

type CallSignature = {
  (props: Props): JSX.Element;
  DesktopIcon: React.FC;
  MobileIcon: React.FC;
  OthersIcon: React.FC;
};

type Props = {
  Icon: React.FC;
  title: [string, string];
  totalSpent: number;
};

const GameCategory: CallSignature = Object.assign(
  (props: Props) => (
    <div className="categories-card">
      <div className="d-flex align-items-center mb-24">
        <props.Icon />
        <p className="color-palette-1 mb-0 ms-12">
          {props.title[0]}
          <br />
          {props.title[1]}
        </p>
      </div>
      <div>
        <p className="text-sm color-palette-2 mb-1">Total Spent</p>
        <p className="text-2xl color-palette-1 fw-medium m-0">
          {formatIDR(props.totalSpent)}
        </p>
      </div>

      <style jsx>{`
        .categories-card {
          background-color: #ffffff;
          padding: 1.875rem;
          border-radius: 1rem;
        }
      `}</style>
    </div>
  ),
  {
    DesktopIcon: CategoryDesktopIcon,
    MobileIcon: CategoryMobileIcon,
    OthersIcon: CategoryOthersIcon,
  }
);

export default GameCategory;

function CategoryDesktopIcon() {
  const maskId = useId();
  const nestedMaskId = useId();

  return (
    <svg
      width={60}
      height={60}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id={maskId}
        mask-type="alpha"
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={60}
        height={60}
      >
        <circle cx={30} cy={30} r={30} fill="#D7D7F8" />
      </mask>
      <g mask={`url(#${maskId})`}>
        <circle cx={30} cy={30} r={30} fill="#D7D7F8" />
        <mask
          id={nestedMaskId}
          mask-type="alpha"
          maskUnits="userSpaceOnUse"
          x={10}
          y={12}
          width={40}
          height={30}
        >
          <rect
            x={10}
            y="12.5"
            width={40}
            height="28.75"
            rx={6}
            fill="#695DE9"
          />
        </mask>
        <g mask={`url(#${nestedMaskId})`}>
          <rect
            x={10}
            y="12.5"
            width={40}
            height="28.75"
            rx={6}
            fill="#695DE9"
          />
          <circle cx={43} cy={19} r={10} fill="#4F46B5" />
        </g>
        <circle cx={43} cy={18} r={9} fill="#2B2467" />
        <path
          d="M42.5109 13.0768C42.6649 12.603 43.3352 12.603 43.4891 13.0768L44.3279 15.6581C44.3967 15.87 44.5942 16.0135 44.817 16.0135H47.5311C48.0293 16.0135 48.2365 16.651 47.8334 16.9438L45.6376 18.5392C45.4574 18.6701 45.3819 18.9023 45.4508 19.1142L46.2895 21.6955C46.4435 22.1693 45.9012 22.5633 45.4981 22.2705L43.3023 20.6751C43.1221 20.5442 42.878 20.5442 42.6977 20.6751L40.5019 22.2705C40.0989 22.5633 39.5566 22.1693 39.7105 21.6955L40.5492 19.1142C40.6181 18.9023 40.5427 18.6701 40.3624 18.5392L38.1666 16.9438C37.7635 16.651 37.9707 16.0135 38.4689 16.0135H41.1831C41.4059 16.0135 41.6033 15.87 41.6722 15.6581L42.5109 13.0768Z"
          fill="white"
        />
        <rect x={25} y={40} width={10} height="7.5" fill="#695DE9" />
        <rect
          x="17.5"
          y="47.5"
          width={25}
          height="2.5"
          rx="1.25"
          fill="#695DE9"
        />
        <path
          d="M32.6875 35.3125L15.5 35.3125"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19.5 18.3125L15.5 18.3125"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M26.4375 29.5L15.5 29.5"
          stroke="#B7B0F4"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

function CategoryMobileIcon() {
  const maskId = useId();
  const nestedMaskId = useId();

  return (
    <svg
      width={60}
      height={60}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id={maskId}
        mask-type="alpha"
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={60}
        height={60}
      >
        <circle cx={30} cy={30} r={30} fill="#D7D7F8" />
      </mask>
      <g mask={`url(#${maskId})`}>
        <circle cx={30} cy={30} r={30} fill="#D7D7F8" />
        <mask
          id={nestedMaskId}
          mask-type="alpha"
          maskUnits="userSpaceOnUse"
          x={12}
          y={16}
          width={30}
          height={49}
        >
          <path
            d="M12 22C12 18.6863 14.6863 16 18 16H36C39.3137 16 42 18.6863 42 22V65H12V22Z"
            fill="#695DE9"
          />
        </mask>
        <g mask={`url(#${nestedMaskId})`}>
          <path
            d="M12 22C12 18.6863 14.6863 16 18 16H36C39.3137 16 42 18.6863 42 22V65H12V22Z"
            fill="#695DE9"
          />
          <path
            d="M16 42C16 40.3431 17.3431 39 19 39H28C29.6569 39 31 40.3431 31 42V61C31 62.6569 29.6569 64 28 64H19C17.3431 64 16 62.6569 16 61V42Z"
            fill="#B7B0F4"
          />
          <path
            d="M34 42C34 40.3431 35.3431 39 37 39H46C47.6569 39 49 40.3431 49 42V61C49 62.6569 47.6569 64 46 64H37C35.3431 64 34 62.6569 34 61V42Z"
            fill="white"
          />
          <circle cx={42} cy={23} r={10} fill="#4F46B5" />
        </g>
        <circle cx={42} cy={21} r={9} fill="#2B2467" />
        <path
          d="M41.5109 16.0768C41.6648 15.603 42.3352 15.603 42.4891 16.0768L43.3279 18.6581C43.3967 18.87 43.5942 19.0135 43.817 19.0135H46.5311C47.0293 19.0135 47.2365 19.651 46.8334 19.9438L44.6376 21.5392C44.4574 21.6701 44.3819 21.9023 44.4508 22.1142L45.2895 24.6955C45.4435 25.1693 44.9012 25.5633 44.4981 25.2705L42.3023 23.6751C42.1221 23.5442 41.878 23.5442 41.6977 23.6751L39.5019 25.2705C39.0989 25.5633 38.5566 25.1693 38.7105 24.6955L39.5492 22.1142C39.6181 21.9023 39.5427 21.6701 39.3624 21.5392L37.1666 19.9438C36.7635 19.651 36.9707 19.0135 37.4689 19.0135H40.1831C40.4059 19.0135 40.6033 18.87 40.6722 18.6581L41.5109 16.0768Z"
          fill="white"
        />
        <path
          d="M27 22L17 22"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M24 27L17 27"
          stroke="#B7B0F4"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

function CategoryOthersIcon() {
  const maskId = useId();
  const nestedMaskId = useId();

  return (
    <svg
      width={60}
      height={60}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id={maskId}
        mask-type="alpha"
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={60}
        height={60}
      >
        <circle cx={30} cy={30} r={30} fill="#D7D7F8" />
      </mask>
      <g mask={`url(#${maskId})`}>
        <circle cx={30} cy={30} r={30} fill="#D7D7F8" />
        <mask
          id={nestedMaskId}
          mask-type="alpha"
          maskUnits="userSpaceOnUse"
          x={10}
          y={12}
          width={40}
          height={30}
        >
          <rect
            x={10}
            y="12.5"
            width={40}
            height="28.75"
            rx={6}
            fill="#695DE9"
          />
        </mask>
        <g mask={`url(#${nestedMaskId})`}>
          <rect
            x={10}
            y="12.5"
            width={40}
            height="28.75"
            rx={6}
            fill="#695DE9"
          />
          <circle cx={43} cy={19} r={10} fill="#4F46B5" />
        </g>
        <circle cx={43} cy={18} r={9} fill="#2B2467" />
        <path
          d="M42.5109 13.0768C42.6649 12.603 43.3352 12.603 43.4891 13.0768L44.3279 15.6581C44.3967 15.87 44.5942 16.0135 44.817 16.0135H47.5311C48.0293 16.0135 48.2365 16.651 47.8334 16.9438L45.6376 18.5392C45.4574 18.6701 45.3819 18.9023 45.4508 19.1142L46.2895 21.6955C46.4435 22.1693 45.9012 22.5633 45.4981 22.2705L43.3023 20.6751C43.1221 20.5442 42.878 20.5442 42.6977 20.6751L40.5019 22.2705C40.0989 22.5633 39.5566 22.1693 39.7105 21.6955L40.5492 19.1142C40.6181 18.9023 40.5427 18.6701 40.3624 18.5392L38.1666 16.9438C37.7635 16.651 37.9707 16.0135 38.4689 16.0135H41.1831C41.4059 16.0135 41.6033 15.87 41.6722 15.6581L42.5109 13.0768Z"
          fill="white"
        />
        <rect x={25} y={40} width={10} height="7.5" fill="#695DE9" />
        <rect
          x="17.5"
          y="47.5"
          width={25}
          height="2.5"
          rx="1.25"
          fill="#695DE9"
        />
        <path
          d="M32.6875 35.3125L15.5 35.3125"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19.5 18.3125L15.5 18.3125"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M26.4375 29.5L15.5 29.5"
          stroke="#B7B0F4"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
