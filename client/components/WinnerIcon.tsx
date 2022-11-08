import { SVGProps, useId } from "react";

export default function WinnerIcon(props: SVGProps<SVGSVGElement>) {
  const maskId = useId();

  return (
    <svg
      width="1em"
      height="1em"
      fill="none"
      viewBox="0 0 80 80"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <mask
        id={maskId}
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={80}
        height={80}
      >
        <circle cx={40} cy={40} r={40} fill="#D7D7F8" />
      </mask>
      <g mask={`url(#${maskId})`}>
        <circle cx={40} cy={40} r={40} fill="#D7D7F8" />
        <rect x={13} y={25} width={54} height={61} rx={16} fill="#695DE9" />
        <path
          d="M50 46v22"
          stroke="#fff"
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M40 54v14M30 60v8"
          stroke="#B7B0F4"
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx={40} cy={26} r={14} fill="#2B2467" />
        <path
          d="M39.049 18.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 0 0-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292Z"
          fill="#fff"
        />
      </g>
    </svg>
  );
}
