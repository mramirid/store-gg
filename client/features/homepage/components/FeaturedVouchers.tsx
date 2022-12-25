import Image from "next/image";
import Link from "next/link";
import type { SVGProps } from "react";

export type TFeaturedVoucher = {
  id: string;
  name: string;
  imageUrl: string;
  category: string;
};

export default function FeaturedVouchers(props: {
  vouchers: TFeaturedVoucher[];
}) {
  return (
    <section className="pt-50 pb-50">
      <div className="container-fluid">
        <h2 className="text-4xl fw-bold color-palette-1 mb-30">
          Our Featured
          <br /> Vouchers This Year
        </h2>
        <div
          className="d-flex flex-row flex-lg-wrap overflow-setting justify-content-lg-between gap-lg-3 gap-4"
          data-aos="fade-up"
        >
          {props.vouchers.map((featuredVoucher) => (
            <FeaturedVoucher key={featuredVoucher.id} {...featuredVoucher} />
          ))}
        </div>
      </div>

      <style jsx>{`
        .overflow-setting {
          overflow-x: auto;
          overflow-y: hidden;
        }

        @media (min-width: 768px) {
          .overflow-setting {
            overflow: hidden;
          }
        }
      `}</style>
    </section>
  );
}

export function FeaturedVoucher(props: TFeaturedVoucher) {
  return (
    <div className="card position-relative">
      <Link href={"/vouchers/" + props.id}>
        <>
          <div className="blur-sharp">
            <div className="img-wrapper">
              <Image
                className="img-fluid"
                src={props.imageUrl}
                width={205}
                height={270}
                alt={props.name}
              />
            </div>
          </div>
          <div className="cover position-absolute bottom-0 m-32">
            <div className="d-flex flex-column h-100 justify-content-between text-decoration-none">
              <div className="console-icon-wrapper mx-auto">
                <ConsoleIcon />
              </div>
              <div>
                <h3 className="fw-semibold text-white text-xl m-0">
                  {props.name}
                </h3>
                <p className="fw-light text-white m-0">{props.category}</p>
              </div>
            </div>
          </div>
        </>
      </Link>

      <style jsx>{`
        .card {
          transition: all 0.4s;
          border-radius: 1.625rem;
          width: 205px;
          height: 270px;
          overflow: hidden;
        }

        .card:hover {
          transition: all 0.4s;
          border: 4px solid #2b2467;
        }

        .card:hover .img-wrapper {
          transition: all 0.4s;
          filter: blur(40px);
          width: 181px;
          height: 246px;
        }

        .blur-sharp {
          overflow: hidden;
          border-radius: 1.625rem;
        }
        .card:hover .blur-sharp {
          border: 7px solid white;
        }

        .cover {
          transition: all 0.4s;
          opacity: 0;
          left: 0;
          right: 0;
          height: -webkit-fill-available;
        }

        .card:hover .cover {
          opacity: 1;
        }

        .console-icon-wrapper {
          margin-top: 3.125rem;
        }

        /* Large devices (desktops, 992px and up) */
        @media (min-width: 992px) {
          .card:hover .blur-sharp {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
      `}</style>
    </div>
  );
}

function ConsoleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={54}
      height={36}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M48.83 6.334C41.749-5.303 31.079 2.793 31.079 2.793c-.692.523-1.968.953-2.835.955l-2.858.002c-.867.001-2.143-.429-2.834-.952 0 0-10.671-8.098-17.755 3.539C-2.286 17.97.568 30.639.568 30.639c.5 3.102 2.148 5.172 5.258 4.912 3.101-.259 9.832-8.354 9.832-8.354.556-.667 1.72-1.212 2.586-1.212l17.134-.003c.866 0 2.03.545 2.585 1.212 0 0 6.732 8.095 9.838 8.354 3.106.26 4.758-1.812 5.255-4.912-.001 0 2.858-12.667-4.225-24.302Zm-28.456 9.472H16.7v3.541s-.778.594-1.982.579c-1.202-.018-1.746-.648-1.746-.648v-3.471h-3.47s-.433-.444-.55-1.613c-.113-1.169.48-2.114.48-2.114h3.675V8.406s.756-.405 1.843-.374c1.088.034 1.885.443 1.885.443l-.015 3.604h3.47s.606.778.656 1.718c.05.941-.572 2.009-.572 2.009Zm16.852 4.036a2.904 2.904 0 0 1-2.906-2.908 2.902 2.902 0 0 1 2.906-2.908 2.909 2.909 0 1 1 0 5.816Zm0-8.001a2.903 2.903 0 0 1-2.906-2.907 2.902 2.902 0 0 1 2.906-2.908 2.909 2.909 0 0 1 2.909 2.908 2.91 2.91 0 0 1-2.91 2.907Zm7.242 4.295a2.903 2.903 0 0 1-2.906-2.908 2.903 2.903 0 0 1 2.906-2.908 2.91 2.91 0 0 1 2.909 2.908 2.91 2.91 0 0 1-2.91 2.908Z"
        fill="#fff"
      />
    </svg>
  );
}
