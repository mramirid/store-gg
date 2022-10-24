import UploadPhotoIcon from "components/atoms/upload-photo-icon";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const SignUpUploadPhoto: NextPage = () => (
  <>
    <Head>
      <title>Sign Up Upload Photo - StoreGG</title>
    </Head>

    <main className="mx-auto pt-lg-227 pb-lg-227 pt-130 pb-50">
      <div className="container mx-auto">
        <form className="form-input d-md-block d-flex flex-column">
          <div>
            <div className="mb-20">
              <div className="image-upload text-center">
                <label htmlFor="avatar">
                  <UploadPhotoIcon />
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
            <Link href="/sign-up/sucess">
              <a
                className="btn btn-create fw-medium text-lg text-white rounded-pill mb-16"
                role="button"
              >
                Create My Account
              </a>
            </Link>
            <Link href="/404">
              <a
                className="btn btn-tnc text-lg color-palette-1 text-decoration-underline pt-15"
                role="button"
              >
                Terms &amp; Conditions
              </a>
            </Link>
          </div>
        </form>
      </div>
    </main>

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

export default SignUpUploadPhoto;
