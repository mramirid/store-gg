import { isObject } from "lodash-es";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Controller } from "react-hook-form";
import { toast } from "react-toastify";
import UploadAvatarIcon from "../../components/UploadAvatarIcon";
import { useJwt, useSignUpForm } from "../../features/auth";
import { getErrorMessage, toError } from "../../utils/error";
import { resolveApiEndpointURL } from "../../utils/format";

type Props = {
  categories: Array<{
    _id: string;
    name: string;
  }>;
};

const SignUpAvatar: NextPage<Props> = ({ categories }) => {
  const { form, submit } = useSignUpForm();
  const { fullName, email } = form.getValues();
  const { avatar: avatarError, favoriteCategory: favoriteCategoryError } =
    form.formState.errors;

  const router = useRouter();

  const jwt = useJwt();

  const submitHandler = async () => {
    try {
      const jwtToken = await submit();
      jwt.setToken(jwtToken);
    } catch (error) {
      toast.error(getErrorMessage(error));
      return;
    }

    router.replace("/dashboard");
    form.reset();
  };

  return (
    <>
      <Head>
        <title>Sign Up Upload Avatar &ndash; StoreGG</title>
      </Head>

      <main className="mx-auto pt-lg-227 pb-lg-227 pt-130 pb-50">
        <div className="container mx-auto">
          <form
            className="form-input d-md-block d-flex flex-column"
            onSubmit={form.handleSubmit(submitHandler)}
          >
            <div>
              <div className="mb-20">
                <div className="image-upload text-center">
                  <Controller
                    control={form.control}
                    name="avatar"
                    render={({ field }) => (
                      <>
                        <label htmlFor="avatar">
                          {isObject(field.value) ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              className="rounded-circle preview"
                              src={URL.createObjectURL(field.value)}
                              alt="Selected avatar"
                            />
                          ) : (
                            <UploadAvatarIcon />
                          )}
                        </label>
                        <input
                          id="avatar"
                          type="file"
                          accept="image/png, image/jpeg, image/jpg, image/gif"
                          onChange={(e) => {
                            const image = e.target.files?.item(0);
                            if (isObject(image)) {
                              field.onChange(image);
                            }
                          }}
                        />
                        {isObject(avatarError) && (
                          <div className="mt-2 text-danger text-sm">
                            {avatarError.message}
                          </div>
                        )}
                      </>
                    )}
                  />
                </div>
              </div>
              <h2 className="fw-bold text-xl text-center color-palette-1 m-0">
                {fullName}
              </h2>
              <p className="text-lg text-center color-palette-1 m-0">{email}</p>
              <div className="pt-50 pb-50">
                <label
                  htmlFor="category"
                  className="form-label text-lg fw-medium color-palette-1 mb-10"
                >
                  Favorite Game
                </label>
                <select
                  {...form.register("favoriteCategory")}
                  id="favoriteCategory"
                  className="form-select d-block w-100 rounded-pill text-lg"
                  aria-label="Favorite Game"
                >
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {isObject(favoriteCategoryError) && (
                  <div className="mt-2 text-danger text-sm">
                    {favoriteCategoryError.message}
                  </div>
                )}
              </div>
            </div>
            <div className="button-group d-flex flex-column mx-auto">
              <button
                className="btn btn-create fw-medium text-lg text-white rounded-pill w-100 mb-16"
                type="submit"
              >
                Create My Account
              </button>
              <button
                type="button"
                className="btn btn-back fw-medium text-lg rounded-pill w-100 mb-16"
                onClick={router.back}
              >
                Back
              </button>
              <Link
                href="/terms"
                className="btn btn-tnc text-lg color-palette-1 text-decoration-underline pt-15"
              >
                Terms &amp; Conditions
              </Link>
            </div>
          </form>
        </div>
      </main>

      <style jsx>{`
        .image-upload .preview {
          width: 120px;
          height: 120px;
          object-fit: cover;
        }

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

        .btn-back {
          padding: 0.75rem;
          background-color: #e7eaf5;
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
};

export default SignUpAvatar;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const response = await fetch(resolveApiEndpointURL("/categories"));

  const data = await response.json();
  if (!response.ok) {
    throw toError(data);
  }

  return {
    props: { categories: data.categories },
  };
};
