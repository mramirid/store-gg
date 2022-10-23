import { SVGProps } from "react";

export default function StarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={24}
      height={22}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11.049.927c.3-.921 1.603-.921 1.902 0l1.968 6.056a1 1 0 0 0 .95.69h6.368c.969 0 1.372 1.24.588 1.81l-5.151 3.742a1 1 0 0 0-.364 1.119l1.968 6.055c.3.921-.755 1.688-1.539 1.118l-5.151-3.742a1 1 0 0 0-1.176 0l-5.151 3.742c-.784.57-1.838-.197-1.539-1.118l1.968-6.056a1 1 0 0 0-.364-1.118l-5.15-3.742c-.785-.57-.382-1.81.587-1.81H8.13a1 1 0 0 0 .951-.69L11.05.927Z"
        fill="#FEBD57"
      />
    </svg>
  );
}
