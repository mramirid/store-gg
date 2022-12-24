import WinnerIcon from "components/WinnerIcon";
import { FC, SVGProps, useId } from "react";

export default function Feature() {
  return (
    <section id="feature" className="pt-50 pb-50">
      <div className="container-fluid">
        <h2 className="text-4xl fw-bold color-palette-1 text-center mb-30">
          It&rsquo;s Really That
          <br /> Easy to Win the Game
        </h2>
        <div className="row gap-lg-0 gap-4" data-aos="fade-up">
          <FeatureStep
            className="col-lg-4"
            Icon={ChooseVoucherIcon}
            title="1. Start"
            descriptions={[
              "Pilih salah satu voucher dari",
              "game yang ingin kamu top up",
            ]}
          />
          <FeatureStep
            className="col-lg-4"
            Icon={TopUpIcon}
            title="2. Fill Up"
            descriptions={[
              "Top up sesuai dengan",
              "nominal yang sudah tersedia",
            ]}
          />
          <FeatureStep
            className="col-lg-4"
            Icon={WinnerIcon}
            title="3. Be a Winner"
            descriptions={["Siap digunakan untuk", "improve permainan kamu"]}
          />
        </div>
      </div>
    </section>
  );
}

export function FeatureStep(props: {
  Icon: FC<SVGProps<SVGSVGElement>>;
  title: string;
  descriptions: [string, string];
  className?: string;
}) {
  return (
    <article className={props.className}>
      <div className="card border-0">
        <props.Icon width={80} height={80} />
        <h3 className="title fw-semibold text-2xl mb-2 color-palette-1">
          {props.title}
        </h3>
        <p className="text-lg color-palette-1 mb-0">
          {props.descriptions[0]}
          <br />
          {props.descriptions[1]}
        </p>
      </div>

      <style jsx>{`
        .card {
          background-color: #f9faff;
          padding: 1.875rem;
          border-radius: 1.625rem;
          margin-right: 16px;
        }

        .title {
          margin-top: 30px;
        }
      `}</style>
    </article>
  );
}

export function ChooseVoucherIcon(props: SVGProps<SVGSVGElement>) {
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
        style={{
          maskType: "alpha",
        }}
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
        <mask
          id="b"
          style={{
            maskType: "alpha",
          }}
          maskUnits="userSpaceOnUse"
          x={-12}
          y={23}
          width={67}
          height={73}
        >
          <path
            d="M-12 23h45c12.15 0 22 9.85 22 22v51h-67V23Z"
            fill="#4D17E2"
          />
        </mask>
        <g mask="url(#b)">
          <path
            d="M-12 23h45c12.15 0 22 9.85 22 22v51h-67V23Z"
            fill="#695DE9"
          />
          <path
            d="M37 55H-4"
            stroke="#fff"
            strokeWidth={4}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M23 64H-4"
            stroke="#B7B0F4"
            strokeWidth={4}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x={23} y={13} width={52} height={34} rx={13} fill="#5C52C7" />
        </g>
        <rect x={27} y={16} width={41} height={27} rx={13} fill="#2B2467" />
        <circle cx={47.5} cy={29.5} r={5.5} stroke="#fff" strokeWidth={4} />
      </g>
    </svg>
  );
}

function TopUpIcon(props: SVGProps<SVGSVGElement>) {
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
        style={{
          maskType: "alpha",
        }}
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
        <rect x={-14} y={16} width={62} height={82} rx={16} fill="#695DE9" />
        <path
          d="M32 36H5"
          stroke="#fff"
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M27 45H9"
          stroke="#B7B0F4"
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x={56} y={37} width={49} height={75} rx={16} fill="#2B2467" />
        <path
          d="M97 50H70"
          stroke="#fff"
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M92 59H74"
          stroke="#6B63AC"
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
