import FeaturedGame from "../molecules/featured-game";

export default function FeaturedGames() {
  return (
    <section className="pt-50 pb-50">
      <div className="container-fluid">
        <h2 className="text-4xl fw-bold color-palette-1 mb-30">
          Our Featured
          <br /> Games This Year
        </h2>
        <div
          className="d-flex flex-row flex-lg-wrap overflow-setting justify-content-lg-between gap-lg-3 gap-4"
          data-aos="fade-up"
        >
          <FeaturedGame
            id="123"
            imageUrl="/images/Thumbnail-1.png"
            name="Super Mechs"
            category="Mobile"
          />
          <FeaturedGame
            id="345"
            imageUrl="/images/Thumbnail-2.png"
            name="Call of Duty: MW"
            category="Mobile"
          />
          <FeaturedGame
            id="678"
            imageUrl="/images/Thumbnail-3.png"
            name="Mobile Legends"
            category="Mobile"
          />
          <FeaturedGame
            id="901"
            imageUrl="/images/Thumbnail-4.png"
            name="Clash of Clans"
            category="Mobile"
          />
          <FeaturedGame
            id="234"
            imageUrl="/images/Thumbnail-5.png"
            name="Valorant"
            category="Desktop"
          />
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
