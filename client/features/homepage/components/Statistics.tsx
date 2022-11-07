export default function Statistics() {
  return (
    <section className="pt-50 pb-50">
      <div className="container-fluid">
        <div className="d-flex flex-lg-row flex-column align-items-center justify-content-center gap-lg-0 gap-4">
          <Statistic value="290M+" unit="Players Top Up" />
          <Divider />
          <Statistic value="12.500" unit="Games Available" />
          <Divider />
          <Statistic value="99,9%" unit="Happy Players" />
          <Divider />
          <Statistic value="4.7" unit="Rating Worldwide" />
        </div>
      </div>
    </section>
  );
}

function Statistic(props: { value: string; unit: string }) {
  return (
    <div className="me-lg-35">
      <p className="text-4xl text-lg-start text-center color-palette-1 fw-bold m-0">
        {props.value}
      </p>
      <p className="text-lg text-lg-start text-center color-palette-2 m-0">
        {props.unit}
      </p>
    </div>
  );
}

function Divider() {
  return (
    <>
      <div className="vertical-line me-lg-35 ms-lg-35 d-lg-block d-none" />
      <div className="horizontal-line mt-6 mb-6 me-lg-35 ms-lg-35 d-lg-none d-block" />

      <style jsx>{`
        .vertical-line {
          width: 1px;
          background-color: #e7eaf5;
          height: 94px;
        }

        .horizontal-line {
          width: 240px;
          background-color: #e7eaf5;
          height: 1px;
        }
      `}</style>
    </>
  );
}
