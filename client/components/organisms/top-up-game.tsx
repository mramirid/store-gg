import Image from "next/image";

export default function TopUpGame(props: { forMobile?: boolean }) {
  if (props.forMobile === true) {
    return (
      <div className="row align-items-center">
        <div className="col-md-12 col-4">
          <div className="img-wrapper card">
            <Image
              className="img-fluid w-100"
              src="/images/Thumbnail-3.png"
              width={280}
              height={380}
              priority
              alt=""
            />
          </div>
        </div>

        {/* Mobile: Game title */}
        <div className="col-md-12 col-8 d-md-none d-block">
          <h2 className="text-xl fw-bold color-palette-1 text-start mb-10">
            Mobile Legends:
            <br />
            The New Battle 2021
          </h2>
          <p className="text-sm color-palette-2 text-start mb-0">
            Category: Mobile
          </p>
        </div>

        <style jsx>{`
          .img-wrapper {
            border-radius: 1.625rem;
            overflow: hidden;
          }
        `}</style>
      </div>
    );
  }

  // Desktop: Game title
  return (
    <div className="pb-50 d-md-block d-none">
      <h2 className="text-4xl fw-bold color-palette-1 text-start mb-10 mt-10">
        Mobile Legends:
        <br />
        The New Battle 2021
      </h2>
      <p className="text-lg color-palette-2 mb-0">Category: Mobile</p>
    </div>
  );
}
