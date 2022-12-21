import type { SVGProps } from "react";

export default function EmptyAvatarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={90}
      height={90}
      viewBox="0 0 90 90"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M45 0C32.569 0 22.5 10.069 22.5 22.5 22.5 34.903 32.569 45 45 45s22.5-10.097 22.5-22.5C67.5 10.069 57.431 0 45 0zm0 56.25c-14.99 0-45 7.51-45 22.5V90h90V78.75c0-14.99-30.01-22.5-45-22.5z"
        style={{
          fill: "#0c145a",
          fillOpacity: 1,
          strokeWidth: 2.8125,
        }}
      />
    </svg>
  );
}
