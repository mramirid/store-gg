import Image from "next/image";

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
            iconName="feature-step-1"
            title="1. Start"
            descriptions={["Pilih salah satu game", "yang ingin kamu top up"]}
          />
          <FeatureStep
            iconName="feature-step-2"
            title="2. Fill Up"
            descriptions={[
              "Top up sesuai dengan",
              "nominal yang sudah tersedia",
            ]}
          />
          <FeatureStep
            iconName="feature-step-3"
            title="3. Be a Winner"
            descriptions={["Siap digunakan untuk", "improve permainan kamu"]}
          />
        </div>
      </div>
    </section>
  );
}

function FeatureStep(props: {
  iconName: "feature-step-1" | "feature-step-2" | "feature-step-3";
  title: string;
  descriptions: [string, string];
}) {
  return (
    <div className="col-lg-4">
      <div className="card border-0">
        <span>
          <Image
            src={require(`../assets/${props.iconName}.svg`)}
            width={80}
            height={80}
            alt={props.title}
          />
        </span>
        <p className="title fw-semibold text-2xl mb-2 color-palette-1">
          {props.title}
        </p>
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
    </div>
  );
}
