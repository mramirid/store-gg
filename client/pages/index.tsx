import classnames from "classnames";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const Home: NextPage = () => (
  <>
    <Head>
      <title>Home - StoreGG</title>
    </Head>

    {/* Navbar */}
    <header>
      <nav
        className={classnames(
          "navbar navbar-expand-lg navbar-light bg-light bg-white pt-lg-40",
          "pb-lg-40 pt-30 pb-50"
        )}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" href="/">
            <a>
              <svg
                width={60}
                height={60}
                viewBox="0 0 60 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  id="mask0"
                  mask-type="alpha"
                  maskUnits="userSpaceOnUse"
                  x={0}
                  y={0}
                  width={60}
                  height={60}
                >
                  <circle cx={30} cy={30} r={30} fill="#3546AB" />
                </mask>
                <g mask="url(#mask0)">
                  <circle cx={30} cy={30} r={30} fill="#00BAFF" />
                  <path
                    d="M41.5001 35.0001C52.3001 38.2001 49.6668 48.0001 47.0001 52.5001L71.0001 60.5001L79.5001 -12.9999C63.6667 -13.8333 29.5001 -14.9999 19.5001 -12.9999C7.00007 -10.4999 13.5001 4.00006 12.0001 14.0001C10.5001 24.0001 28.0001 31.0001 41.5001 35.0001Z"
                    fill="#4D17E2"
                  />
                  <path
                    d="M54.495 47.785C54.495 51.285 53.655 54.54 51.975 57.55C50.295 60.56 47.74 63.01 44.31 64.9C40.88 66.79 36.645 67.735 31.605 67.735C26.705 67.735 22.33 66.86 18.48 65.11C14.7 63.29 11.655 60.84 9.345 57.76C7.105 54.61 5.81 51.04 5.46 47.05H15.645C15.855 49.15 16.555 51.215 17.745 53.245C19.005 55.205 20.755 56.85 22.995 58.18C25.305 59.44 28.07 60.07 31.29 60.07C35.49 60.07 38.71 58.95 40.95 56.71C43.19 54.47 44.31 51.6 44.31 48.1C44.31 45.09 43.505 42.64 41.895 40.75C40.355 38.86 38.43 37.39 36.12 36.34C33.81 35.22 30.66 34.03 26.67 32.77C21.98 31.23 18.2 29.795 15.33 28.465C12.53 27.065 10.115 25 8.085 22.27C6.125 19.54 5.145 15.935 5.145 11.455C5.145 7.60499 6.055 4.20999 7.875 1.27C9.765 -1.67 12.425 -3.945 15.855 -5.555C19.355 -7.165 23.45 -7.97 28.14 -7.97C35.42 -7.97 41.195 -6.185 45.465 -2.615C49.735 0.884996 52.22 5.365 52.92 10.825H42.63C42.07 7.885 40.565 5.295 38.115 3.055C35.665 0.814997 32.34 -0.305003 28.14 -0.305003C24.29 -0.305003 21.21 0.709996 18.9 2.73999C16.59 4.69999 15.435 7.5 15.435 11.14C15.435 14.01 16.17 16.355 17.64 18.175C19.18 19.925 21.07 21.325 23.31 22.375C25.55 23.355 28.63 24.475 32.55 25.735C37.31 27.275 41.125 28.745 43.995 30.145C46.935 31.545 49.42 33.68 51.45 36.55C53.48 39.35 54.495 43.095 54.495 47.785Z"
                    fill="white"
                  />
                </g>
              </svg>
            </a>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto text-lg gap-lg-0 gap-2">
              <li className="nav-item my-auto">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item my-auto">
                <a className="nav-link" href="#">
                  Games
                </a>
              </li>
              <li className="nav-item my-auto">
                <a className="nav-link" href="#">
                  Rewards
                </a>
              </li>
              <li className="nav-item my-auto">
                <a className="nav-link" href="#">
                  Discover
                </a>
              </li>
              <li className="nav-item my-auto me-lg-20">
                <a className="nav-link" href="#">
                  Global Rank
                </a>
              </li>
              <li className="nav-item my-auto">
                <a
                  className="btn btn-sign-in d-flex justify-content-center ms-lg-2 rounded-pill"
                  href="./src/sign-in.html"
                  role="button"
                >
                  Sign In
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>

    {/* Hero */}
    <section className="hero pt-lg-60 pb-50">
      <div className="container-xxl container-fluid">
        <div className="row gap-lg-0 gap-5">
          <div className="col-lg-6 col-12 my-auto">
            <p className="text-support text-lg color-palette-2">Halo gamers,</p>
            <h1 className="hero-title color-palette-1 fw-bold">
              Topup &amp; Get <span className="d-sm-inline d-none">a</span>
              <span className="d-sm-none d-inline">a</span>
              <span className="underline-blue"> New</span>{" "}
              <br className="d-sm-block d-none" />{" "}
              <span className="underline-blue">Experience</span> in Gaming
            </h1>
            <p className="mt-30 mb-40 text-lg color-palette-1">
              Kami menyediakan jutaan cara untuk membantu
              <br className="d-md-block d-none" /> players menjadi pemenang
              sejati
            </p>
            <div className="d-flex flex-lg-row flex-column gap-4">
              <a
                className="btn btn-get text-lg text-white rounded-pill"
                href="#feature"
                role="button"
              >
                Get Started
              </a>
              <a
                className="btn-learn text-lg color-palette-1 my-auto text-center"
                href="#"
                role="button"
              >
                Learn More
              </a>
            </div>
          </div>
          <div className="col-lg-6 col-12 d-lg-block d-none">
            <div className="d-flex justify-content-lg-end justify-content-center me-lg-5">
              <div className="position-relative" data-aos="zoom-in">
                <Image
                  src="/images/Header-1.png"
                  className="img-fluid"
                  alt=""
                  priority
                  width={490}
                  height={484}
                />
                <div className="card left-card position-absolute border-0">
                  <div className="d-flex align-items-center mb-16 gap-3">
                    <Image
                      src="/images/Header-2.png"
                      width={40}
                      height={40}
                      className="rounded-pill"
                      alt=""
                    />
                    <div>
                      <p className="text-sm fw-medium color-palette-1 m-0">
                        Harley Hanson
                      </p>
                      <p className="text-xs fw-light color-palette-2 m-0">
                        Professional Gamer
                      </p>
                    </div>
                  </div>
                  <div className="d-flex gap-2">
                    <svg
                      width={24}
                      height={22}
                      viewBox="0 0 24 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.0489 0.927049C11.3483 0.0057386 12.6517 0.00574004 12.9511 0.927051L14.9187 6.98278C15.0526 7.3948 15.4365 7.67376 15.8697 7.67376H22.2371C23.2058 7.67376 23.6086 8.91338 22.8249 9.48278L17.6736 13.2254C17.3231 13.4801 17.1764 13.9314 17.3103 14.3435L19.2779 20.3992C19.5773 21.3205 18.5228 22.0866 17.7391 21.5172L12.5878 17.7746C12.2373 17.5199 11.7627 17.5199 11.4122 17.7746L6.2609 21.5172C5.47719 22.0866 4.42271 21.3205 4.72206 20.3992L6.68969 14.3435C6.82356 13.9314 6.6769 13.4801 6.32642 13.2254L1.17511 9.48278C0.391392 8.91338 0.794168 7.67376 1.76289 7.67376H8.13026C8.56349 7.67376 8.94744 7.3948 9.08132 6.98278L11.0489 0.927049Z"
                        fill="#FEBD57"
                      />
                    </svg>
                    <svg
                      width={24}
                      height={22}
                      viewBox="0 0 24 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.0489 0.927049C11.3483 0.0057386 12.6517 0.00574004 12.9511 0.927051L14.9187 6.98278C15.0526 7.3948 15.4365 7.67376 15.8697 7.67376H22.2371C23.2058 7.67376 23.6086 8.91338 22.8249 9.48278L17.6736 13.2254C17.3231 13.4801 17.1764 13.9314 17.3103 14.3435L19.2779 20.3992C19.5773 21.3205 18.5228 22.0866 17.7391 21.5172L12.5878 17.7746C12.2373 17.5199 11.7627 17.5199 11.4122 17.7746L6.2609 21.5172C5.47719 22.0866 4.42271 21.3205 4.72206 20.3992L6.68969 14.3435C6.82356 13.9314 6.6769 13.4801 6.32642 13.2254L1.17511 9.48278C0.391392 8.91338 0.794168 7.67376 1.76289 7.67376H8.13026C8.56349 7.67376 8.94744 7.3948 9.08132 6.98278L11.0489 0.927049Z"
                        fill="#FEBD57"
                      />
                    </svg>
                    <svg
                      width={24}
                      height={22}
                      viewBox="0 0 24 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.0489 0.927049C11.3483 0.0057386 12.6517 0.00574004 12.9511 0.927051L14.9187 6.98278C15.0526 7.3948 15.4365 7.67376 15.8697 7.67376H22.2371C23.2058 7.67376 23.6086 8.91338 22.8249 9.48278L17.6736 13.2254C17.3231 13.4801 17.1764 13.9314 17.3103 14.3435L19.2779 20.3992C19.5773 21.3205 18.5228 22.0866 17.7391 21.5172L12.5878 17.7746C12.2373 17.5199 11.7627 17.5199 11.4122 17.7746L6.2609 21.5172C5.47719 22.0866 4.42271 21.3205 4.72206 20.3992L6.68969 14.3435C6.82356 13.9314 6.6769 13.4801 6.32642 13.2254L1.17511 9.48278C0.391392 8.91338 0.794168 7.67376 1.76289 7.67376H8.13026C8.56349 7.67376 8.94744 7.3948 9.08132 6.98278L11.0489 0.927049Z"
                        fill="#FEBD57"
                      />
                    </svg>
                    <svg
                      width={24}
                      height={22}
                      viewBox="0 0 24 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.0489 0.927049C11.3483 0.0057386 12.6517 0.00574004 12.9511 0.927051L14.9187 6.98278C15.0526 7.3948 15.4365 7.67376 15.8697 7.67376H22.2371C23.2058 7.67376 23.6086 8.91338 22.8249 9.48278L17.6736 13.2254C17.3231 13.4801 17.1764 13.9314 17.3103 14.3435L19.2779 20.3992C19.5773 21.3205 18.5228 22.0866 17.7391 21.5172L12.5878 17.7746C12.2373 17.5199 11.7627 17.5199 11.4122 17.7746L6.2609 21.5172C5.47719 22.0866 4.42271 21.3205 4.72206 20.3992L6.68969 14.3435C6.82356 13.9314 6.6769 13.4801 6.32642 13.2254L1.17511 9.48278C0.391392 8.91338 0.794168 7.67376 1.76289 7.67376H8.13026C8.56349 7.67376 8.94744 7.3948 9.08132 6.98278L11.0489 0.927049Z"
                        fill="#FEBD57"
                      />
                    </svg>
                    <svg
                      width={24}
                      height={22}
                      viewBox="0 0 24 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.0489 0.927049C11.3483 0.0057386 12.6517 0.00574004 12.9511 0.927051L14.9187 6.98278C15.0526 7.3948 15.4365 7.67376 15.8697 7.67376H22.2371C23.2058 7.67376 23.6086 8.91338 22.8249 9.48278L17.6736 13.2254C17.3231 13.4801 17.1764 13.9314 17.3103 14.3435L19.2779 20.3992C19.5773 21.3205 18.5228 22.0866 17.7391 21.5172L12.5878 17.7746C12.2373 17.5199 11.7627 17.5199 11.4122 17.7746L6.2609 21.5172C5.47719 22.0866 4.42271 21.3205 4.72206 20.3992L6.68969 14.3435C6.82356 13.9314 6.6769 13.4801 6.32642 13.2254L1.17511 9.48278C0.391392 8.91338 0.794168 7.67376 1.76289 7.67376H8.13026C8.56349 7.67376 8.94744 7.3948 9.08132 6.98278L11.0489 0.927049Z"
                        fill="#FEBD57"
                      />
                    </svg>
                  </div>
                </div>
                <div className="card right-card position-absolute border-0">
                  <div className="position-relative d-flex flex-row justify-content-center mb-24">
                    <Image
                      src="/images/Header-3.png"
                      className="rounded-pill"
                      alt=""
                      width={80}
                      height={80}
                    />
                    <p className="right-card-support text-white text-xxs text-center position-absolute m-0">
                      New
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-center m-0 fw-medium color-palette-1">
                      Lann Knight
                    </p>
                    <p className="fw-light text-center m-0 color-palette-2 text-xs">
                      Dota 2
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* 3 Column - Feature */}
    <section id="feature" className="feature pt-50 pb-50">
      <div className="container-fluid">
        <h2 className="text-4xl fw-bold color-palette-1 text-center mb-30">
          It’s Really That
          <br /> Easy to Win the Game
        </h2>
        <div className="row gap-lg-0 gap-4" data-aos="fade-up">
          <div className="col-lg-4">
            <div className="card feature-card border-0">
              <svg
                className="mb-30"
                width={80}
                height={80}
                viewBox="0 0 80 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  id="mask0-icon1"
                  mask-type="alpha"
                  maskUnits="userSpaceOnUse"
                  x={0}
                  y={0}
                  width={80}
                  height={80}
                >
                  <circle cx={40} cy={40} r={40} fill="#D7D7F8" />
                </mask>
                <g mask="url(#mask0-icon1)">
                  <circle cx={40} cy={40} r={40} fill="#D7D7F8" />
                  <mask
                    id="mask1"
                    mask-type="alpha"
                    maskUnits="userSpaceOnUse"
                    x={-12}
                    y={23}
                    width={67}
                    height={73}
                  >
                    <path
                      d="M-12 23H33C45.1503 23 55 32.8497 55 45V96H-12V23Z"
                      fill="#4D17E2"
                    />
                  </mask>
                  <g mask="url(#mask1)">
                    <path
                      d="M-12 23H33C45.1503 23 55 32.8497 55 45V96H-12V23Z"
                      fill="#695DE9"
                    />
                    <path
                      d="M37 55H-4"
                      stroke="white"
                      strokeWidth={4}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M23 64L-4 64"
                      stroke="#B7B0F4"
                      strokeWidth={4}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <rect
                      x={23}
                      y={13}
                      width={52}
                      height={34}
                      rx={13}
                      fill="#5C52C7"
                    />
                  </g>
                  <rect
                    x={27}
                    y={16}
                    width={41}
                    height={27}
                    rx={13}
                    fill="#2B2467"
                  />
                  <circle
                    cx="47.5"
                    cy="29.5"
                    r="5.5"
                    stroke="white"
                    strokeWidth={4}
                  />
                </g>
              </svg>
              <p className="fw-semibold text-2xl mb-2 color-palette-1">
                1. Start
              </p>
              <p className="text-lg color-palette-1 mb-0">
                Pilih salah satu game
                <br />
                yang ingin kamu top up
              </p>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card feature-card border-0">
              <svg
                className="mb-30"
                width={80}
                height={80}
                viewBox="0 0 80 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  id="mask0-icon2"
                  mask-type="alpha"
                  maskUnits="userSpaceOnUse"
                  x={0}
                  y={0}
                  width={80}
                  height={80}
                >
                  <circle cx={40} cy={40} r={40} fill="#D7D7F8" />
                </mask>
                <g mask="url(#mask0-icon2)">
                  <circle cx={40} cy={40} r={40} fill="#D7D7F8" />
                  <rect
                    x={-14}
                    y={16}
                    width={62}
                    height={82}
                    rx={16}
                    fill="#695DE9"
                  />
                  <path
                    d="M32 36H5"
                    stroke="white"
                    strokeWidth={4}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M27 45L9 45"
                    stroke="#B7B0F4"
                    strokeWidth={4}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <rect
                    x={56}
                    y={37}
                    width={49}
                    height={75}
                    rx={16}
                    fill="#2B2467"
                  />
                  <path
                    d="M97 50H70"
                    stroke="white"
                    strokeWidth={4}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M92 59L74 59"
                    stroke="#6B63AC"
                    strokeWidth={4}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
              <p className="fw-semibold text-2xl mb-2 color-palette-1">
                2. Fill Up
              </p>
              <p className="text-lg color-palette-1 mb-0">
                Top up sesuai dengan
                <br />
                nominal yang sudah tersedia
              </p>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card feature-card border-0">
              <svg
                className="mb-30"
                width={80}
                height={80}
                viewBox="0 0 80 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  id="mask0-icon3"
                  mask-type="alpha"
                  maskUnits="userSpaceOnUse"
                  x={0}
                  y={0}
                  width={80}
                  height={80}
                >
                  <circle cx={40} cy={40} r={40} fill="#D7D7F8" />
                </mask>
                <g mask="url(#mask0-icon3)">
                  <circle cx={40} cy={40} r={40} fill="#D7D7F8" />
                  <rect
                    x={13}
                    y={25}
                    width={54}
                    height={61}
                    rx={16}
                    fill="#695DE9"
                  />
                  <path
                    d="M50 46L50 68"
                    stroke="white"
                    strokeWidth={4}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M40 54L40 68"
                    stroke="#B7B0F4"
                    strokeWidth={4}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M30 60L30 68"
                    stroke="#B7B0F4"
                    strokeWidth={4}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx={40} cy={26} r={14} fill="#2B2467" />
                  <path
                    d="M39.0489 18.927C39.3483 18.0057 40.6517 18.0057 40.9511 18.9271L42.0206 22.2188C42.1545 22.6309 42.5385 22.9098 42.9717 22.9098H46.4329C47.4016 22.9098 47.8044 24.1494 47.0207 24.7188L44.2205 26.7533C43.87 27.0079 43.7234 27.4593 43.8572 27.8713L44.9268 31.1631C45.2261 32.0844 44.1717 32.8506 43.388 32.2812L40.5878 30.2467C40.2373 29.9921 39.7627 29.9921 39.4122 30.2467L36.612 32.2812C35.8283 32.8506 34.7739 32.0844 35.0732 31.1631L36.1428 27.8713C36.2766 27.4593 36.13 27.0079 35.7795 26.7533L32.9793 24.7188C32.1956 24.1494 32.5984 22.9098 33.5671 22.9098H37.0283C37.4615 22.9098 37.8455 22.6309 37.9794 22.2188L39.0489 18.927Z"
                    fill="white"
                  />
                </g>
              </svg>
              <p className="fw-semibold text-2xl mb-2 color-palette-1">
                3. Be a Winner
              </p>
              <p className="text-lg color-palette-1 mb-0">
                Siap digunakan untuk
                <br />
                improve permainan kamu
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* 5 Column - Featured-game */}
    <section className="featured-game pt-50 pb-50">
      <div className="container-fluid">
        <h2 className="text-4xl fw-bold color-palette-1 mb-30">
          Our Featured
          <br /> Games This Year
        </h2>
        <div
          className="d-flex flex-row flex-lg-wrap overflow-setting justify-content-lg-between gap-lg-3 gap-4"
          data-aos="fade-up"
        >
          <div className="featured-game-card position-relative">
            <a href="./src/detail.html">
              <div className="blur-sharp">
                <Image
                  src="/images/Thumbnail-1.png"
                  width={205}
                  height={270}
                  alt=""
                />
              </div>
              <div className="cover position-absolute bottom-0 m-32">
                <div className="d-flex flex-column h-100 justify-content-between text-decoration-none">
                  <div className="game-icon mx-auto">
                    <svg
                      width={54}
                      height={36}
                      viewBox="0 0 54 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M48.8309 6.33404C41.7479 -5.30296 31.0779 2.79304 31.0779 2.79304C30.3859 3.31604 29.1099 3.74604 28.2429 3.74804L25.3849 3.75004C24.5179 3.75104 23.2419 3.32104 22.5509 2.79804C22.5509 2.79804 11.8799 -5.29996 4.79595 6.33704C-2.28605 17.97 0.567947 30.639 0.567947 30.639C1.06795 33.741 2.71595 35.811 5.82595 35.551C8.92695 35.292 15.6579 27.197 15.6579 27.197C16.2139 26.53 17.3789 25.985 18.2439 25.985L35.3779 25.982C36.2439 25.982 37.4079 26.527 37.9629 27.194C37.9629 27.194 44.6949 35.289 47.8009 35.548C50.9069 35.808 52.5589 33.736 53.0559 30.636C53.0549 30.636 55.9139 17.969 48.8309 6.33404ZM20.3739 15.806H16.6999V19.347C16.6999 19.347 15.9219 19.941 14.7179 19.926C13.5159 19.908 12.9719 19.278 12.9719 19.278V15.807H9.50195C9.50195 15.807 9.06895 15.363 8.95295 14.194C8.83895 13.025 9.43195 12.08 9.43195 12.08H13.1069V8.40604C13.1069 8.40604 13.8629 8.00104 14.9499 8.03204C16.0379 8.06604 16.8349 8.47504 16.8349 8.47504L16.8199 12.079H20.2899C20.2899 12.079 20.8959 12.857 20.9459 13.797C20.9959 14.738 20.3739 15.806 20.3739 15.806ZM37.2259 19.842C35.6169 19.842 34.3199 18.541 34.3199 16.934C34.3199 15.324 35.6169 14.026 37.2259 14.026C38.8279 14.026 40.1349 15.324 40.1349 16.934C40.1349 18.542 38.8279 19.842 37.2259 19.842ZM37.2259 11.841C35.6169 11.841 34.3199 10.541 34.3199 8.93404C34.3199 7.32404 35.6169 6.02604 37.2259 6.02604C38.8279 6.02604 40.1349 7.32404 40.1349 8.93404C40.1349 10.542 38.8279 11.841 37.2259 11.841ZM44.4679 16.136C42.8589 16.136 41.5619 14.836 41.5619 13.228C41.5619 11.619 42.8589 10.32 44.4679 10.32C46.0699 10.32 47.3769 11.619 47.3769 13.228C47.3769 14.836 46.0699 16.136 44.4679 16.136Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="fw-semibold text-white text-xl m-0">
                      Super Mechs
                    </p>
                    <p className="fw-light text-white m-0">Mobile</p>
                  </div>
                </div>
              </div>
            </a>
          </div>
          <div className="featured-game-card position-relative">
            <a href="./src/detail.html">
              <div className="blur-sharp">
                <Image
                  src="/images/Thumbnail-2.png"
                  width={205}
                  height={270}
                  alt=""
                />
              </div>
              <div className="cover position-absolute bottom-0 m-32">
                <div className="d-flex flex-column h-100 justify-content-between text-decoration-none">
                  <div className="game-icon mx-auto">
                    <svg
                      width={54}
                      height={36}
                      viewBox="0 0 54 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M48.8309 6.33404C41.7479 -5.30296 31.0779 2.79304 31.0779 2.79304C30.3859 3.31604 29.1099 3.74604 28.2429 3.74804L25.3849 3.75004C24.5179 3.75104 23.2419 3.32104 22.5509 2.79804C22.5509 2.79804 11.8799 -5.29996 4.79595 6.33704C-2.28605 17.97 0.567947 30.639 0.567947 30.639C1.06795 33.741 2.71595 35.811 5.82595 35.551C8.92695 35.292 15.6579 27.197 15.6579 27.197C16.2139 26.53 17.3789 25.985 18.2439 25.985L35.3779 25.982C36.2439 25.982 37.4079 26.527 37.9629 27.194C37.9629 27.194 44.6949 35.289 47.8009 35.548C50.9069 35.808 52.5589 33.736 53.0559 30.636C53.0549 30.636 55.9139 17.969 48.8309 6.33404ZM20.3739 15.806H16.6999V19.347C16.6999 19.347 15.9219 19.941 14.7179 19.926C13.5159 19.908 12.9719 19.278 12.9719 19.278V15.807H9.50195C9.50195 15.807 9.06895 15.363 8.95295 14.194C8.83895 13.025 9.43195 12.08 9.43195 12.08H13.1069V8.40604C13.1069 8.40604 13.8629 8.00104 14.9499 8.03204C16.0379 8.06604 16.8349 8.47504 16.8349 8.47504L16.8199 12.079H20.2899C20.2899 12.079 20.8959 12.857 20.9459 13.797C20.9959 14.738 20.3739 15.806 20.3739 15.806ZM37.2259 19.842C35.6169 19.842 34.3199 18.541 34.3199 16.934C34.3199 15.324 35.6169 14.026 37.2259 14.026C38.8279 14.026 40.1349 15.324 40.1349 16.934C40.1349 18.542 38.8279 19.842 37.2259 19.842ZM37.2259 11.841C35.6169 11.841 34.3199 10.541 34.3199 8.93404C34.3199 7.32404 35.6169 6.02604 37.2259 6.02604C38.8279 6.02604 40.1349 7.32404 40.1349 8.93404C40.1349 10.542 38.8279 11.841 37.2259 11.841ZM44.4679 16.136C42.8589 16.136 41.5619 14.836 41.5619 13.228C41.5619 11.619 42.8589 10.32 44.4679 10.32C46.0699 10.32 47.3769 11.619 47.3769 13.228C47.3769 14.836 46.0699 16.136 44.4679 16.136Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="fw-semibold text-white text-xl m-0">
                      Call of Duty: Modern
                    </p>
                    <p className="fw-light text-white m-0">Mobile</p>
                  </div>
                </div>
              </div>
            </a>
          </div>
          <div className="featured-game-card position-relative">
            <a href="./src/detail.html">
              <div className="blur-sharp">
                <Image
                  src="/images/Thumbnail-3.png"
                  width={205}
                  height={270}
                  alt=""
                />
              </div>
              <div className="cover position-absolute bottom-0 m-32">
                <div className="d-flex flex-column h-100 justify-content-between text-decoration-none">
                  <div className="game-icon mx-auto">
                    <svg
                      width={54}
                      height={36}
                      viewBox="0 0 54 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M48.8309 6.33404C41.7479 -5.30296 31.0779 2.79304 31.0779 2.79304C30.3859 3.31604 29.1099 3.74604 28.2429 3.74804L25.3849 3.75004C24.5179 3.75104 23.2419 3.32104 22.5509 2.79804C22.5509 2.79804 11.8799 -5.29996 4.79595 6.33704C-2.28605 17.97 0.567947 30.639 0.567947 30.639C1.06795 33.741 2.71595 35.811 5.82595 35.551C8.92695 35.292 15.6579 27.197 15.6579 27.197C16.2139 26.53 17.3789 25.985 18.2439 25.985L35.3779 25.982C36.2439 25.982 37.4079 26.527 37.9629 27.194C37.9629 27.194 44.6949 35.289 47.8009 35.548C50.9069 35.808 52.5589 33.736 53.0559 30.636C53.0549 30.636 55.9139 17.969 48.8309 6.33404ZM20.3739 15.806H16.6999V19.347C16.6999 19.347 15.9219 19.941 14.7179 19.926C13.5159 19.908 12.9719 19.278 12.9719 19.278V15.807H9.50195C9.50195 15.807 9.06895 15.363 8.95295 14.194C8.83895 13.025 9.43195 12.08 9.43195 12.08H13.1069V8.40604C13.1069 8.40604 13.8629 8.00104 14.9499 8.03204C16.0379 8.06604 16.8349 8.47504 16.8349 8.47504L16.8199 12.079H20.2899C20.2899 12.079 20.8959 12.857 20.9459 13.797C20.9959 14.738 20.3739 15.806 20.3739 15.806ZM37.2259 19.842C35.6169 19.842 34.3199 18.541 34.3199 16.934C34.3199 15.324 35.6169 14.026 37.2259 14.026C38.8279 14.026 40.1349 15.324 40.1349 16.934C40.1349 18.542 38.8279 19.842 37.2259 19.842ZM37.2259 11.841C35.6169 11.841 34.3199 10.541 34.3199 8.93404C34.3199 7.32404 35.6169 6.02604 37.2259 6.02604C38.8279 6.02604 40.1349 7.32404 40.1349 8.93404C40.1349 10.542 38.8279 11.841 37.2259 11.841ZM44.4679 16.136C42.8589 16.136 41.5619 14.836 41.5619 13.228C41.5619 11.619 42.8589 10.32 44.4679 10.32C46.0699 10.32 47.3769 11.619 47.3769 13.228C47.3769 14.836 46.0699 16.136 44.4679 16.136Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="fw-semibold text-white text-xl m-0">
                      Mobile Legends
                    </p>
                    <p className="fw-light text-white m-0">Mobile</p>
                  </div>
                </div>
              </div>
            </a>
          </div>
          <div className="featured-game-card position-relative">
            <a href="./src/detail.html">
              <div className="blur-sharp">
                <Image
                  src="/images/Thumbnail-4.png"
                  width={205}
                  height={270}
                  alt=""
                />
              </div>
              <div className="cover position-absolute bottom-0 m-32">
                <div className="d-flex flex-column h-100 justify-content-between text-decoration-none">
                  <div className="game-icon mx-auto">
                    <svg
                      width={54}
                      height={36}
                      viewBox="0 0 54 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M48.8309 6.33404C41.7479 -5.30296 31.0779 2.79304 31.0779 2.79304C30.3859 3.31604 29.1099 3.74604 28.2429 3.74804L25.3849 3.75004C24.5179 3.75104 23.2419 3.32104 22.5509 2.79804C22.5509 2.79804 11.8799 -5.29996 4.79595 6.33704C-2.28605 17.97 0.567947 30.639 0.567947 30.639C1.06795 33.741 2.71595 35.811 5.82595 35.551C8.92695 35.292 15.6579 27.197 15.6579 27.197C16.2139 26.53 17.3789 25.985 18.2439 25.985L35.3779 25.982C36.2439 25.982 37.4079 26.527 37.9629 27.194C37.9629 27.194 44.6949 35.289 47.8009 35.548C50.9069 35.808 52.5589 33.736 53.0559 30.636C53.0549 30.636 55.9139 17.969 48.8309 6.33404ZM20.3739 15.806H16.6999V19.347C16.6999 19.347 15.9219 19.941 14.7179 19.926C13.5159 19.908 12.9719 19.278 12.9719 19.278V15.807H9.50195C9.50195 15.807 9.06895 15.363 8.95295 14.194C8.83895 13.025 9.43195 12.08 9.43195 12.08H13.1069V8.40604C13.1069 8.40604 13.8629 8.00104 14.9499 8.03204C16.0379 8.06604 16.8349 8.47504 16.8349 8.47504L16.8199 12.079H20.2899C20.2899 12.079 20.8959 12.857 20.9459 13.797C20.9959 14.738 20.3739 15.806 20.3739 15.806ZM37.2259 19.842C35.6169 19.842 34.3199 18.541 34.3199 16.934C34.3199 15.324 35.6169 14.026 37.2259 14.026C38.8279 14.026 40.1349 15.324 40.1349 16.934C40.1349 18.542 38.8279 19.842 37.2259 19.842ZM37.2259 11.841C35.6169 11.841 34.3199 10.541 34.3199 8.93404C34.3199 7.32404 35.6169 6.02604 37.2259 6.02604C38.8279 6.02604 40.1349 7.32404 40.1349 8.93404C40.1349 10.542 38.8279 11.841 37.2259 11.841ZM44.4679 16.136C42.8589 16.136 41.5619 14.836 41.5619 13.228C41.5619 11.619 42.8589 10.32 44.4679 10.32C46.0699 10.32 47.3769 11.619 47.3769 13.228C47.3769 14.836 46.0699 16.136 44.4679 16.136Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="fw-semibold text-white text-xl m-0">
                      Clash of Clans
                    </p>
                    <p className="fw-light text-white m-0">Mobile</p>
                  </div>
                </div>
              </div>
            </a>
          </div>
          <div className="featured-game-card position-relative">
            <a href="./src/detail.html">
              <div className="blur-sharp">
                <Image
                  src="/images/Thumbnail-5.png"
                  width={205}
                  height={270}
                  alt=""
                />
              </div>
              <div className="cover position-absolute bottom-0 m-32">
                <div className="d-flex flex-column h-100 justify-content-between text-decoration-none">
                  <div className="game-icon mx-auto">
                    <svg
                      width={54}
                      height={36}
                      viewBox="0 0 54 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M48.8309 6.33404C41.7479 -5.30296 31.0779 2.79304 31.0779 2.79304C30.3859 3.31604 29.1099 3.74604 28.2429 3.74804L25.3849 3.75004C24.5179 3.75104 23.2419 3.32104 22.5509 2.79804C22.5509 2.79804 11.8799 -5.29996 4.79595 6.33704C-2.28605 17.97 0.567947 30.639 0.567947 30.639C1.06795 33.741 2.71595 35.811 5.82595 35.551C8.92695 35.292 15.6579 27.197 15.6579 27.197C16.2139 26.53 17.3789 25.985 18.2439 25.985L35.3779 25.982C36.2439 25.982 37.4079 26.527 37.9629 27.194C37.9629 27.194 44.6949 35.289 47.8009 35.548C50.9069 35.808 52.5589 33.736 53.0559 30.636C53.0549 30.636 55.9139 17.969 48.8309 6.33404ZM20.3739 15.806H16.6999V19.347C16.6999 19.347 15.9219 19.941 14.7179 19.926C13.5159 19.908 12.9719 19.278 12.9719 19.278V15.807H9.50195C9.50195 15.807 9.06895 15.363 8.95295 14.194C8.83895 13.025 9.43195 12.08 9.43195 12.08H13.1069V8.40604C13.1069 8.40604 13.8629 8.00104 14.9499 8.03204C16.0379 8.06604 16.8349 8.47504 16.8349 8.47504L16.8199 12.079H20.2899C20.2899 12.079 20.8959 12.857 20.9459 13.797C20.9959 14.738 20.3739 15.806 20.3739 15.806ZM37.2259 19.842C35.6169 19.842 34.3199 18.541 34.3199 16.934C34.3199 15.324 35.6169 14.026 37.2259 14.026C38.8279 14.026 40.1349 15.324 40.1349 16.934C40.1349 18.542 38.8279 19.842 37.2259 19.842ZM37.2259 11.841C35.6169 11.841 34.3199 10.541 34.3199 8.93404C34.3199 7.32404 35.6169 6.02604 37.2259 6.02604C38.8279 6.02604 40.1349 7.32404 40.1349 8.93404C40.1349 10.542 38.8279 11.841 37.2259 11.841ZM44.4679 16.136C42.8589 16.136 41.5619 14.836 41.5619 13.228C41.5619 11.619 42.8589 10.32 44.4679 10.32C46.0699 10.32 47.3769 11.619 47.3769 13.228C47.3769 14.836 46.0699 16.136 44.4679 16.136Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="fw-semibold text-white text-xl m-0">
                      Valorant
                    </p>
                    <p className="fw-light text-white m-0">Desktop</p>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>

    {/* Reached */}
    <section className="reached pt-50 pb-50">
      <div className="container-fluid">
        <div className="d-flex flex-lg-row flex-column align-items-center justify-content-center gap-lg-0 gap-4">
          <div className="me-lg-35">
            <p className="text-4xl text-lg-start text-center color-palette-1 fw-bold m-0">
              290M+
            </p>
            <p className="text-lg text-lg-start text-center color-palette-2 m-0">
              Players Top Up
            </p>
          </div>
          <div className="vertical-line me-lg-35 ms-lg-35 d-lg-block d-none" />
          <div className="horizontal-line mt-6 mb-6 me-lg-35 ms-lg-35 d-lg-none d-block" />
          <div className="me-lg-35 ms-lg-35">
            <p className="text-4xl text-lg-start text-center color-palette-1 fw-bold m-0">
              12.500
            </p>
            <p className="text-lg text-lg-start text-center color-palette-2 m-0">
              Games Available
            </p>
          </div>
          <div className="horizontal-line mt-6 mb-6 me-lg-35 ms-lg-35 d-lg-none d-block" />
          <div className="vertical-line me-lg-35 ms-lg-35 d-lg-block d-none" />
          <div className="me-lg-35 ms-lg-35">
            <p className="text-4xl text-lg-start text-center color-palette-1 fw-bold m-0">
              99,9%
            </p>
            <p className="text-lg text-lg-start text-center color-palette-2 m-0">
              Happy Players
            </p>
          </div>
          <div className="horizontal-line mt-6 mb-6 me-lg-35 ms-lg-35 d-lg-none d-block" />
          <div className="vertical-line me-lg-35 ms-lg-35 d-lg-block d-none" />
          <div className="me-lg-35 ms-lg-35">
            <p className="text-4xl text-lg-start text-center color-palette-1 fw-bold m-0">
              4.7
            </p>
            <p className="text-lg text-lg-start text-center color-palette-2 m-0">
              Rating Worldwide
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Story */}
    <section className="story pt-50 pb-50">
      <div className="container-xxl container-fluid">
        <div className="row align-items-center px-lg-5 mx-auto gap-lg-0 gap-4">
          <div
            className="col-lg-7 col-12 d-lg-flex d-none justify-content-lg-end pe-lg-60"
            data-aos="zoom-in"
          >
            <Image
              src="/images/Header-9.png"
              width={612}
              height={452}
              className="img-fluid"
              alt=""
            />
          </div>
          <div className="col-lg-5 col-12 ps-lg-60">
            <div className="">
              <h2 className="text-4xl fw-bold color-palette-1 mb-30">
                Win the battle.
                <br /> Be the Champion.
              </h2>
              <p className="text-lg color-palette-1 mb-30">
                Kami menyediakan jutaan cara untuk
                <br className="d-sm-block d-none" />
                membantu players menjadi
                <br className="d-sm-block d-none" /> pemenang sejati
              </p>
              <div className="d-md-block d-flex flex-column w-100">
                <a
                  className="btn btn-read text-lg rounded-pill"
                  href="#"
                  role="button"
                >
                  Read Story
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Footer */}
    <section className="footer pt-50">
      <footer>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-4 text-lg-start text-center">
              <a href="" className="mb-30">
                <svg
                  width={60}
                  height={60}
                  viewBox="0 0 60 60"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <mask
                    id="mask0"
                    mask-type="alpha"
                    maskUnits="userSpaceOnUse"
                    x={0}
                    y={0}
                    width={60}
                    height={60}
                  >
                    <circle cx={30} cy={30} r={30} fill="#3546AB" />
                  </mask>
                  <g mask="url(#mask0)">
                    <circle cx={30} cy={30} r={30} fill="#00BAFF" />
                    <path
                      d="M41.5001 35.0001C52.3001 38.2001 49.6668 48.0001 47.0001 52.5001L71.0001 60.5001L79.5001 -12.9999C63.6667 -13.8333 29.5001 -14.9999 19.5001 -12.9999C7.00007 -10.4999 13.5001 4.00006 12.0001 14.0001C10.5001 24.0001 28.0001 31.0001 41.5001 35.0001Z"
                      fill="#4D17E2"
                    />
                    <path
                      d="M54.495 47.785C54.495 51.285 53.655 54.54 51.975 57.55C50.295 60.56 47.74 63.01 44.31 64.9C40.88 66.79 36.645 67.735 31.605 67.735C26.705 67.735 22.33 66.86 18.48 65.11C14.7 63.29 11.655 60.84 9.345 57.76C7.105 54.61 5.81 51.04 5.46 47.05H15.645C15.855 49.15 16.555 51.215 17.745 53.245C19.005 55.205 20.755 56.85 22.995 58.18C25.305 59.44 28.07 60.07 31.29 60.07C35.49 60.07 38.71 58.95 40.95 56.71C43.19 54.47 44.31 51.6 44.31 48.1C44.31 45.09 43.505 42.64 41.895 40.75C40.355 38.86 38.43 37.39 36.12 36.34C33.81 35.22 30.66 34.03 26.67 32.77C21.98 31.23 18.2 29.795 15.33 28.465C12.53 27.065 10.115 25 8.085 22.27C6.125 19.54 5.145 15.935 5.145 11.455C5.145 7.60499 6.055 4.20999 7.875 1.27C9.765 -1.67 12.425 -3.945 15.855 -5.555C19.355 -7.165 23.45 -7.97 28.14 -7.97C35.42 -7.97 41.195 -6.185 45.465 -2.615C49.735 0.884996 52.22 5.365 52.92 10.825H42.63C42.07 7.885 40.565 5.295 38.115 3.055C35.665 0.814997 32.34 -0.305003 28.14 -0.305003C24.29 -0.305003 21.21 0.709996 18.9 2.73999C16.59 4.69999 15.435 7.5 15.435 11.14C15.435 14.01 16.17 16.355 17.64 18.175C19.18 19.925 21.07 21.325 23.31 22.375C25.55 23.355 28.63 24.475 32.55 25.735C37.31 27.275 41.125 28.745 43.995 30.145C46.935 31.545 49.42 33.68 51.45 36.55C53.48 39.35 54.495 43.095 54.495 47.785Z"
                      fill="white"
                    />
                  </g>
                </svg>
              </a>
              <p className="mt-30 text-lg color-palette-1 mb-30">
                StoreGG membantu gamers
                <br /> untuk menjadi pemenang sejati
              </p>
              <p className="mt-30 text-lg color-palette-1 mb-30">
                Copyright 2021. All Rights Reserved.
              </p>
            </div>
            <div className="col-lg-8 mt-lg-0 mt-20">
              <div className="row gap-sm-0">
                <div className="col-md-4 col-6 mb-lg-0 mb-25">
                  <p className="text-lg fw-semibold color-palette-1 mb-12">
                    Company
                  </p>
                  <ul className="list-unstyled">
                    <li className="mb-6">
                      <a
                        href=""
                        className="text-lg color-palette-1 text-decoration-none"
                      >
                        About Us
                      </a>
                    </li>
                    <li className="mb-6">
                      <a
                        href=""
                        className="text-lg color-palette-1 text-decoration-none"
                      >
                        Press Release
                      </a>
                    </li>
                    <li className="mb-6">
                      <a
                        href=""
                        className="text-lg color-palette-1 text-decoration-none"
                      >
                        Terms of Use
                      </a>
                    </li>
                    <li className="mb-6">
                      <a
                        href=""
                        className="text-lg color-palette-1 text-decoration-none"
                      >
                        Privacy &amp; Policy
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col-md-4 col-6 mb-lg-0 mb-25">
                  <p className="text-lg fw-semibold color-palette-1 mb-12">
                    Support
                  </p>
                  <ul className="list-unstyled">
                    <li className="mb-6">
                      <a
                        href=""
                        className="text-lg color-palette-1 text-decoration-none"
                      >
                        Refund Policy
                      </a>
                    </li>
                    <li className="mb-6">
                      <a
                        href=""
                        className="text-lg color-palette-1 text-decoration-none"
                      >
                        Unlock Rewards
                      </a>
                    </li>
                    <li className="mb-6">
                      <a
                        href=""
                        className="text-lg color-palette-1 text-decoration-none"
                      >
                        Live Chatting
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col-md-4 col-12 mt-lg-0 mt-md-0 mt-25">
                  <p className="text-lg fw-semibold color-palette-1 mb-12">
                    Connect
                  </p>
                  <ul className="list-unstyled">
                    <li className="mb-6">
                      <a
                        href="mailto: hi@store.gg"
                        className="text-lg color-palette-1 text-decoration-none"
                      >
                        hi@store.gg
                      </a>
                    </li>
                    <li className="mb-6">
                      <a
                        href="mailto: team@store.gg"
                        className="text-lg color-palette-1 text-decoration-none"
                      >
                        team@store.gg
                      </a>
                    </li>
                    <li className="mb-6">
                      <a
                        href="http://maps.google.com/?q=Pasific 12,
                                Jakarta Selatan"
                        className="text-lg color-palette-1 text-decoration-none"
                      >
                        Pasific 12, Jakarta Selatan
                      </a>
                    </li>
                    <li className="mb-6">
                      <a
                        href="tel: 02111229090"
                        className="text-lg color-palette-1 text-decoration-none"
                      >
                        021 - 1122 - 9090
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </section>

    <style jsx>{`
      /* Navbar */
      .navbar-light .navbar-nav .nav-link.active,
      .navbar-light .navbar-nav .show > .nav-link {
        font-weight: 500;
        color: #0c145a;
      }

      .navbar-light .navbar-nav .nav-link:hover {
        color: #0c145a;
      }

      .navbar-light .navbar-nav .nav-link {
        color: #7e8cac;
      }

      .navbar-light .btn-sign-in {
        color: #0c145a;
        background-color: #e7eaf5;
        padding: 0.75rem 1.875rem;
      }
      /*  */

      /* Hero */
      .hero .hero-title {
        font-size: 2.625rem;
        line-height: 1.5;
      }

      .hero .btn-get {
        background-color: #4d17e2;
        padding: 0.75rem 3rem;
      }

      .hero .btn-learn:hover {
        color: #0c145a;
      }

      .hero .card {
        border-radius: 1rem;
        box-shadow: -8px 8px 58px 0px rgba(0, 0, 0, 0.1);
      }

      .hero .left-card {
        width: 207px;
        height: 112px;
        top: 6.68rem;
        left: -3.625rem;
        padding: 0.875rem;
      }

      .hero .right-card {
        width: 135px;
        height: 177px;
        bottom: 6.5rem;
        right: -3.2rem;
        padding: 1.25rem 1.5rem;
      }

      .hero .right-card-support {
        padding: 0.063rem 0.625rem;
        background-color: #00baff;
        width: max-content;
        border-radius: 0.375rem;
        bottom: -0.5rem;
        left: auto;
        right: auto;
      }
      /*  */

      /* Feature */
      .feature .feature-card {
        background-color: #f9faff;
        padding: 1.875rem;
        border-radius: 1.625rem;
        margin-right: 16px;
      }
      /*  */

      /* Featured Game */
      .featured-game .overflow-setting {
        overflow-x: auto;
        overflow-y: hidden;
      }

      .featured-game .featured-game-card {
        transition: all 0.4s;
        border-radius: 1.625rem;
        width: 205px;
        height: 270px;
      }

      .featured-game .featured-game-card:hover {
        transition: all 0.4s;
        border: 4px solid #2b2467;
      }

      .featured-game .featured-game-card:hover img {
        transition: all 0.4s;
        filter: blur(40px);
        width: 181px;
        height: 246px;
      }

      .featured-game .featured-game-card .blur-sharp {
        overflow: hidden;
        border-radius: 1.625rem;
      }
      .featured-game .featured-game-card:hover .blur-sharp {
        width: 192px;
        border: 7px solid white;
      }

      .featured-game .cover {
        transition: all 0.4s;
        opacity: 0;
        left: 0;
        right: 0;
        height: -webkit-fill-available;
      }

      .featured-game .featured-game-card:hover .cover {
        opacity: 1;
      }

      .featured-game .game-icon {
        margin-top: 3.125rem;
      }

      @media (min-width: 768px) {
        .featured-game .overflow-setting {
          overflow: hidden;
        }
      }

      /*  */

      /* Reached */
      .reached .vertical-line {
        width: 1px;
        background-color: #e7eaf5;
        height: 94px;
      }

      .reached .horizontal-line {
        width: 240px;
        background-color: #e7eaf5;
        height: 1px;
      }
      /*  */

      /* Story */
      .story .btn-read {
        padding: 0.75rem 3rem;
        background-color: #e7eaf5;
      }

      .story .img-fluid {
        max-width: 100%;
        height: auto;
      }
      /*  */

      /* Footer */
      footer {
        padding-top: 5rem;
        padding-bottom: 5rem;
        background-color: #f9faff;
      }

      footer ul {
        margin-bottom: 0;
      }

      footer ul li a {
        transition: 0.2s;
      }

      footer ul li a:hover {
        color: #4d17e2;
        text-decoration: underline !important;
        background-color: transparent;
      }

      /* Small devices (landscape phones, 576px and up) */
      @media (min-width: 576px) {
      }

      @media (max-width: 768px) {
      }

      /* Medium devices (tablets, 768px and up) */
      @media (min-width: 768px) {
        /* Hero */

        /*  */
      }

      /* Large devices (desktops, 992px and up) */
      @media (min-width: 992px) {
        /* Navbar */
        .navbar-expand-lg .navbar-nav .nav-link {
          padding-right: 1.25rem;
          padding-left: 1.25rem;
        }
        /*  */

        /* Hero */
        .hero .underline-blue {
          text-decoration: none;
          position: relative;
        }

        .hero .underline-blue:after {
          position: absolute;
          content: "";
          height: 8px;
          bottom: 11px;
          margin: 0 auto;
          left: 0;
          right: 0;
          width: 100%;
          background: #00baff;
          z-index: -10;
        }
        /*  */

        /* Featured Game */
        .featured-game .featured-game-card:hover .blur-sharp {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }

      /* X-Large devices (large desktops, 1200px and up) */
      @media (min-width: 1200px) {
      }
    `}</style>
  </>
);

export default Home;
