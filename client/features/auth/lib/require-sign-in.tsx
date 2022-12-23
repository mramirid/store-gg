import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useJwt } from "./jwt";

export default function requireSignIn<P extends JSX.IntrinsicAttributes>(
  Page: NextPage<P>
) {
  const ProtectedPageWrapper = (props: P) => {
    const jwt = useJwt();

    const router = useRouter();

    if (!jwt.isReady) {
      return null;
    }

    if (!jwt.hasToken) {
      router.replace("/sign-in");
      return null;
    }

    return <Page {...props} />;
  };

  return ProtectedPageWrapper;
}
