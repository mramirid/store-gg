import FeatureStep from "../molecules/feature-step";

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
