import Image from "next/image";
import Link from "next/link";
import Console from "public/icons/console.svg";

export default function FeaturedGame(props: {
  id: string;
  imageUrl: string;
  name: string;
  category: string;
}) {
  return (
    <div className="featured-game__card position-relative">
      <Link href={`/games/${props.id}`}>
        <a>
          <div className="blur-sharp">
            <div className="featured-game__img-wrapper">
              <Image
                src={props.imageUrl}
                width={205}
                height={270}
                layout="fixed"
                alt=""
              />
            </div>
          </div>
          <div className="cover position-absolute bottom-0 m-32">
            <div className="d-flex flex-column h-100 justify-content-between text-decoration-none">
              <div className="game-icon mx-auto">
                <Console />
              </div>
              <div>
                <p className="fw-semibold text-white text-xl m-0">
                  {props.name}
                </p>
                <p className="fw-light text-white m-0">{props.name}</p>
              </div>
            </div>
          </div>
        </a>
      </Link>

      <style jsx>{`
        .featured-game__card {
          transition: all 0.4s;
          border-radius: 1.625rem;
          width: 205px;
          height: 270px;
        }

        .featured-game__img-wrapper {
          font-size: 0;
        }

        .featured-game__card:hover {
          transition: all 0.4s;
          border: 4px solid #2b2467;
        }

        .featured-game__card:hover .featured-game__img-wrapper {
          transition: all 0.4s;
          filter: blur(40px);
          width: 181px;
          height: 246px;
        }

        .blur-sharp {
          overflow: hidden;
          border-radius: 1.625rem;
        }
        .featured-game__card:hover .blur-sharp {
          border: 7px solid white;
        }

        .cover {
          transition: all 0.4s;
          opacity: 0;
          left: 0;
          right: 0;
          height: -webkit-fill-available;
        }

        .featured-game__card:hover .cover {
          opacity: 1;
        }

        .game-icon {
          margin-top: 3.125rem;
        }

        /* Large devices (desktops, 992px and up) */
        @media (min-width: 992px) {
          .featured-game__card:hover .blur-sharp {
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
