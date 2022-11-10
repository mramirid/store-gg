import Image from "next/image";
import Link from "next/link";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

Object.defineProperty(Image, "default", {
  configurable: true,
  value: (props) => <img {...props} />,
});

Object.defineProperty(Link, "default", {
  configurable: true,
  value: (props) => (
    <a {...props} href="#">
      {props.children}
    </a>
  ),
});
