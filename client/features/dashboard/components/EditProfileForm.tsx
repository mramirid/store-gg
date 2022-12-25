import TextInput from "components/TextInput";
import UploadAvatarIcon from "components/UploadAvatarIcon";
import { JwtPayload, useJwt } from "features/auth";
import { StatusCodes } from "http-status-codes";
import { isObject, isString } from "lodash-es";
import Image from "next/image";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { objectKeys } from "utils";
import { ErrorWithMessage, getErrorMessage } from "utils/error";
import { resolveApiEndpointURL } from "utils/format";

type ProfileFormValues = { avatar: File | undefined } & Pick<
  JwtPayload,
  "fullName" | "email" | "phoneNumber"
>;

type ProfileFormNames = keyof ProfileFormValues;

function isFile(maybeFile: unknown): maybeFile is File {
  return maybeFile instanceof File;
}

const formValidationErrorStatuses = Object.freeze([
  StatusCodes.UNPROCESSABLE_ENTITY,
  StatusCodes.CONFLICT,
]);

export default function EditProfileForm() {
  const jwt = useJwt();
  const currentAvatarUrl = jwt.payload?.avatarUrl;

  const [shouldRemoveAvatar, setShouldRemoveAvatar] = useState(false);

  const { register, handleSubmit, formState, control, setError } =
    useForm<ProfileFormValues>({
      defaultValues: {
        fullName: jwt.payload?.fullName ?? "",
        email: jwt.payload?.email ?? "",
        phoneNumber: jwt.payload?.phoneNumber,
      },
    });

  const setFormErrors = (
    errors: Record<ProfileFormNames, ErrorWithMessage>
  ) => {
    objectKeys(errors).forEach((fieldName) => {
      setError(fieldName, {
        type: "onChange",
        message: getErrorMessage(errors[fieldName]),
      });
    });
  };

  const submitHandler = async (formValues: ProfileFormValues) => {
    const formData = new FormData();
    formData.append("fullName", formValues.fullName);
    formData.append("email", formValues.email);
    formData.append("phoneNumber", formValues.phoneNumber ?? "");
    if (isFile(formValues.avatar)) {
      formData.append("avatar", formValues.avatar, formValues.avatar.name);
    }

    const endpointURL = new URL(resolveApiEndpointURL("/members"));
    if (shouldRemoveAvatar) {
      endpointURL.searchParams.set("removeAvatar", "");
    }

    let response: Response;
    try {
      response = await fetch(endpointURL, {
        method: "PATCH",
        body: formData,
        headers: { Authorization: `Bearer ${jwt.token}` },
      });
    } catch (error) {
      throw new Error("Failed to edit your profile. Try again later.", {
        cause: error,
      });
    }

    const resBody = await response.json();

    if (!response.ok) {
      const errorMessage = getErrorMessage(resBody);
      toast.error(errorMessage);

      if (formValidationErrorStatuses.includes(response.status)) {
        setFormErrors(resBody.cause.errors);
      }
      return;
    }

    toast.success(resBody.message);
    jwt.setToken(resBody.jwtToken);
    setShouldRemoveAvatar(false);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Controller
        control={control}
        name="avatar"
        render={({ field }) => {
          return (
            <div className="d-flex">
              {isFile(field.value) ? (
                <div className="avatar__wrapper me-20">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="avatar rounded-circle"
                    src={URL.createObjectURL(field.value)}
                    width={90}
                    height={90}
                    alt="Selected avatar"
                  />
                  <div
                    className="avatar-overlay position-absolute top-0 d-flex justify-content-center align-items-center"
                    onClick={() => {
                      field.onChange(undefined);
                      setShouldRemoveAvatar(true);
                    }}
                  >
                    <TrashIcon />
                  </div>
                </div>
              ) : !shouldRemoveAvatar && isString(currentAvatarUrl) ? (
                <div className="avatar__wrapper me-20">
                  <Image
                    className="avatar rounded-circle"
                    src={currentAvatarUrl}
                    width={90}
                    height={90}
                    alt="Your current avatar"
                  />
                  <div
                    className="avatar-overlay position-absolute top-0 d-flex justify-content-center align-items-center"
                    onClick={() => setShouldRemoveAvatar(true)}
                  >
                    <TrashIcon />
                  </div>
                </div>
              ) : null}
              <div className="image-upload">
                <label htmlFor={field.name}>
                  <UploadAvatarIcon width={90} height={90} />
                </label>
                <input
                  type="file"
                  id={field.name}
                  name={field.name}
                  accept="image/png, image/jpeg, image/jpg, image/gif"
                  onChange={(e) => {
                    const image = e.target.files?.item(0);
                    if (isObject(image)) {
                      field.onChange(image);
                      setShouldRemoveAvatar(false);
                    }
                  }}
                />
              </div>
            </div>
          );
        }}
      />
      <div className="pt-30">
        <TextInput
          {...register("fullName")}
          label="Full Name"
          type="text"
          id="name"
          aria-describedby="name"
          placeholder="Enter your name"
          error={formState.errors.fullName}
        />
      </div>
      <div className="pt-30">
        <TextInput
          {...register("email")}
          label="Email Address"
          type="email"
          id="email"
          aria-describedby="email"
          placeholder="Enter your email address"
          error={formState.errors.email}
        />
      </div>
      <div className="pt-30">
        <TextInput
          {...register("phoneNumber")}
          label="Phone"
          type="tel"
          id="phone"
          aria-describedby="phone"
          placeholder="Enter your phone number"
          error={formState.errors.phoneNumber}
        />
      </div>
      <div className="button-group d-flex flex-column pt-50">
        <button
          type="submit"
          className="btn btn-save fw-medium text-lg text-white rounded-pill"
          role="button"
        >
          Save My Profile
        </button>
      </div>

      <style jsx>{`
        .avatar-overlay:hover {
          opacity: 1;
        }

        .avatar__wrapper {
          position: relative;
          line-height: 0;
        }

        .avatar-overlay {
          background-color: rgba(12, 20, 90, 0.7);
          width: 90px;
          height: 90px;
          border-radius: 999px;
          opacity: 0;
          transition: all 0.3s linear;
          cursor: pointer;
        }

        .image-upload label {
          cursor: pointer;
        }

        .image-upload input {
          visibility: hidden;
          width: 0;
          height: 0;
        }

        .btn-save {
          padding: 0.75rem;
          background-color: #4d17e2;
        }

        .button-group {
          max-width: 467px;
        }
      `}</style>
    </form>
  );
}

function TrashIcon() {
  return (
    <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14ZM14 11v6M10 11v6"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
