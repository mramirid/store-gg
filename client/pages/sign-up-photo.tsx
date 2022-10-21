import { NextPage } from "next";
import Head from "next/head";

const SignUpPhoto: NextPage = () => (
  <>
    <Head>
      <title>Sign Up Photo - StoreGG</title>
    </Head>

    <section className="mx-auto pt-lg-227 pb-lg-227 pt-130 pb-50">
      <div className="container mx-auto">
        <form action="">
          <div className="form-input d-md-block d-flex flex-column">
            <div>
              <div className="mb-20">
                <div className="image-upload text-center">
                  <label htmlFor="avatar">
                    <svg
                      width={120}
                      height={120}
                      viewBox="0 0 120 120"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx={60} cy={60} r={60} fill="#E7EAF5" />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M60 52.5C57.0641 52.5 54.6239 54.2954 53.7502 56.711C53.559 57.2397 53.0883 57.617 52.5307 57.6886C49.915 58.0244 48 60.135 48 62.5714C48 65.2253 50.2807 67.5 53.25 67.5C54.0784 67.5 54.75 68.1716 54.75 69C54.75 69.8284 54.0784 70.5 53.25 70.5C48.7635 70.5 45 67.0184 45 62.5714C45 58.7996 47.7137 55.7171 51.2715 54.8729C52.7994 51.6764 56.1564 49.5 60 49.5C64.7615 49.5 68.8073 52.8602 69.4965 57.3516C72.5948 57.9685 75 60.5965 75 63.8571C75 67.594 71.841 70.5 68.1 70.5C67.2716 70.5 66.6 69.8284 66.6 69C66.6 68.1716 67.2716 67.5 68.1 67.5C70.3237 67.5 72 65.8009 72 63.8571C72 61.9134 70.3237 60.2143 68.1 60.2143C67.2716 60.2143 66.6 59.5427 66.6 58.7143C66.6 55.3504 63.7149 52.5 60 52.5Z"
                        fill="#0C145A"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M60 70.5C59.1716 70.5 58.5 69.8284 58.5 69V60C58.5 59.1716 59.1716 58.5 60 58.5C60.8284 58.5 61.5 59.1716 61.5 60V69C61.5 69.8284 60.8284 70.5 60 70.5Z"
                        fill="#0C145A"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M55.9393 64.0607C55.3536 63.4749 55.3536 62.5251 55.9393 61.9393L58.9393 58.9393C59.5251 58.3536 60.4749 58.3536 61.0607 58.9393C61.6464 59.5251 61.6464 60.4749 61.0607 61.0607L58.0607 64.0607C57.4749 64.6464 56.5251 64.6464 55.9393 64.0607Z"
                        fill="#0C145A"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M58.9393 58.9393C59.5251 58.3536 60.4749 58.3536 61.0607 58.9393L64.0607 61.9393C64.6464 62.5251 64.6464 63.4749 64.0607 64.0607C63.4749 64.6464 62.5251 64.6464 61.9393 64.0607L58.9393 61.0607C58.3536 60.4749 58.3536 59.5251 58.9393 58.9393Z"
                        fill="#0C145A"
                      />
                    </svg>
                  </label>
                  <input
                    id="avatar"
                    type="file"
                    name="avatar"
                    accept="image/png, image/jpeg"
                  />
                </div>
              </div>
              <h2 className="fw-bold text-xl text-center color-palette-1 m-0">
                Harley Hanson
              </h2>
              <p className="text-lg text-center color-palette-1 m-0">
                hanson@example.net
              </p>
              <div className="pt-50 pb-50">
                <label
                  htmlFor="category"
                  className="form-label text-lg fw-medium color-palette-1 mb-10"
                >
                  Favorite Game
                </label>
                <select
                  id="category"
                  name="category"
                  className="form-select d-block w-100 rounded-pill text-lg"
                  aria-label="Favorite Game"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  <option value="fps">First Person Shoter</option>
                  <option value="rpg">Role Playing Game</option>
                  <option value="arcade">Arcade</option>
                  <option value="sport">Sport</option>
                </select>
              </div>
            </div>
            <div className="button-group d-flex flex-column mx-auto">
              <a
                className="btn btn-create fw-medium text-lg text-white rounded-pill mb-16"
                href="./sign-up-photo-success.html"
                role="button"
              >
                Create My Account
              </a>
              <a
                className="btn btn-tnc text-lg color-palette-1 text-decoration-underline pt-15"
                href="#"
                role="button"
              >
                Terms &amp; Conditions
              </a>
            </div>
          </div>
        </form>
      </div>
    </section>

    <style jsx>{`
      .image-upload > input {
        visibility: hidden;
        width: 0;
        height: 0;
      }

      .image-upload > label {
        cursor: pointer;
      }

      select {
        border: 1px solid #0c145a;
        padding: 0.75rem 1.625rem;
        color: #0c145a;
        background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071Z' fill='%230C145A'/%3E%3C/svg%3E%0A");
        background-size: 26px 24px;
        background-repeat: no-repeat;
        -webkit-appearance: none;
        -moz-appearance: none;
      }

      select:focus-within,
      select:active {
        outline: none;
      }

      .btn-create {
        padding: 0.75rem;
        background-color: #4d17e2;
      }

      .button-group {
        width: 100%;
      }

      @media (max-width: 576px) {
        .form-input {
          height: 100vh;
          justify-content: space-between;
        }
      }

      @media (min-width: 992px) {
        .container,
        select {
          max-width: 437px;
        }
      }
    `}</style>
  </>
);

export default SignUpPhoto;
