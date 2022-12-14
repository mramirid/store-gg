import { StatusCodes } from "http-status-codes";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import {
  Nominal,
  PaymentMethod,
  TopUpForm,
  TopUpVoucherDetails,
} from "../../../features/voucher";
import { ResponseError } from "../../../lib/error";
import { getErrorMessage } from "../../../utils/error";
import {
  resolveApiEndpointURL,
  resolveApiImageURL,
} from "../../../utils/format";

const TopUp: NextPage<Props> = ({ voucher, paymentMethods }) => (
  <>
    <Head>
      <title>Topup {voucher.name} &ndash; StoreGG</title>
    </Head>

    <header>
      <Navbar />
    </header>

    <main className="pt-lg-60 pb-100">
      <div className="container-xxl container-fluid">
        <div className="detail-header pb-50">
          <h1 className="text-4xl fw-bold color-palette-1 text-start mb-10">
            Top Up
          </h1>
          <p className="text-lg color-palette-1 mb-0">
            Perkuat akun dan jadilah pemenang
          </p>
        </div>
        <div className="row">
          <div className="col-xl-3 col-lg-4 col-md-5 pb-30 pb-md-0 pe-md-25 text-md-start">
            <TopUpVoucherDetails
              forMobile
              name={voucher.name}
              imageUrl={voucher.imageUrl}
              category={voucher.category.name}
            />
          </div>
          <div className="col-xl-9 col-lg-8 col-md-7 ps-md-25">
            <TopUpVoucherDetails
              name={voucher.name}
              imageUrl={voucher.imageUrl}
              category={voucher.category.name}
            />
            <hr />
            <TopUpForm
              nominals={voucher.nominals}
              paymentMethods={paymentMethods}
            />
          </div>
        </div>
      </div>
    </main>

    <Footer />

    <style jsx>{`
      hr {
        margin: 0;
        background-color: #e7eaf5;
        border: 0;
        opacity: 1;
      }
    `}</style>
  </>
);

export default TopUp;

type Props = {
  voucher: Voucher;
  paymentMethods: PaymentMethod[];
};

type Voucher = { imageUrl: string } & Pick<
  VoucherResponse,
  "_id" | "name" | "category" | "nominals"
>;

type VoucherResponse = {
  _id: string;
  name: string;
  imageName: string;
  category: {
    _id: string;
    name: string;
  };
  nominals: Nominal[];
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(resolveApiEndpointURL("/vouchers/ids"));
  const data = await response.json();

  if (!response.ok) {
    throw new ResponseError(getErrorMessage(data), response.status);
  }

  const paths = (data.voucherIds as string[]).map((voucherId) => ({
    params: { id: voucherId },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const voucherId = params?.["id"] as string;
  let voucher: Voucher, paymentMethods: PaymentMethod[];

  try {
    [voucher, paymentMethods] = await Promise.all([
      getVoucher(voucherId),
      getPaymentMethods(),
    ]);
  } catch (error) {
    if (
      error instanceof ResponseError &&
      error.status === StatusCodes.NOT_FOUND
    ) {
      return { notFound: true };
    }
    throw error;
  }

  return {
    props: { voucher, paymentMethods },
  };
};

async function getVoucher(voucherId: string): Promise<Voucher> {
  const response = await fetch(resolveApiEndpointURL("/vouchers/" + voucherId));
  const data = await response.json();

  if (!response.ok) {
    throw new ResponseError(getErrorMessage(data), response.status);
  }

  const voucherResponse: VoucherResponse = data.voucher;
  return {
    _id: voucherResponse._id,
    name: voucherResponse.name,
    category: voucherResponse.category,
    imageUrl: resolveApiImageURL(voucherResponse.imageName),
    nominals: voucherResponse.nominals,
  };
}

async function getPaymentMethods(): Promise<PaymentMethod[]> {
  const response = await fetch(resolveApiEndpointURL("/payment-methods"));
  const data = await response.json();

  if (!response.ok) {
    throw new ResponseError(getErrorMessage(data), response.status);
  }

  return data.paymentMethods;
}
