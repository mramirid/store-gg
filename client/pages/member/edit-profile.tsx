import TextInput from "components/TextInput";
import UploadPhotoIcon from "components/UploadPhotoIcon";
import { Sidebar } from "features/dashboard";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

const EditProfile: NextPage = () => (
  <>
    <Head>
      <title>Edit Profile - StoreGG</title>
    </Head>

    <section className="edit-profile overflow-auto">
      <Sidebar />
      <main className="main-wrapper">
        <div className="ps-lg-0">
          <h2 className="text-4xl fw-bold color-palette-1 mb-30">Settings</h2>
          <div className="bg-card pt-30 ps-30 pe-30 pb-30">
            <form action="">
              <div className="photo d-flex">
                <div className="avatar__wrapper me-20">
                  <Image
                    className="avatar rounded-circle"
                    src={require("features/homepage/assets/avatar-1.jpg")}
                    width={90}
                    height={90}
                    alt="Your current avatar"
                  />
                  <div className="avatar-overlay position-absolute top-0 d-flex justify-content-center align-items-center">
                    <TrashIcon />
                  </div>
                </div>
                <div className="image-upload">
                  <label htmlFor="avatar">
                    <UploadPhotoIcon width={90} height={90} />
                  </label>
                  <input
                    id="avatar"
                    type="file"
                    name="avatar"
                    accept="image/png, image/jpeg"
                  />
                </div>
              </div>
              <div className="pt-30">
                <TextInput
                  label="Full Name"
                  type="text"
                  id="name"
                  name="name"
                  aria-describedby="name"
                  placeholder="Enter your name"
                />
              </div>
              <div className="pt-30">
                <TextInput
                  label="Email Address"
                  type="email"
                  id="email"
                  name="email"
                  aria-describedby="email"
                  placeholder="Enter your email address"
                />
              </div>
              <div className="pt-30">
                <TextInput
                  label="Phone"
                  type="tel"
                  id="phone"
                  name="phone"
                  aria-describedby="phone"
                  placeholder="Enter your phone number"
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
            </form>
          </div>
        </div>
      </main>
    </section>

    <style jsx>{`
      .edit-profile {
        background-color: #fbfcfd;
      }

      .edit-profile main.main-wrapper {
        margin-left: 340px;
        height: 100%;
        margin-right: auto;
        position: relative;
        padding: 50px 50px 50px 0px;
      }

      .edit-profile .bg-card {
        background-color: #fff;
        border-radius: 1rem;
        max-width: 590px;
      }
      .edit-profile main .avatar-overlay:hover {
        opacity: 1;
      }

      .edit-profile main .avatar__wrapper {
        position: relative;
        line-height: 0;
      }

      .edit-profile main .avatar-overlay {
        background-color: rgba(12, 20, 90, 0.7);
        width: 90px;
        height: 90px;
        border-radius: 999px;
        opacity: 0;
        transition: all 0.3s linear;
        cursor: pointer;
      }

      .edit-profile .image-upload label {
        cursor: pointer;
      }

      .edit-profile .image-upload input {
        visibility: hidden;
        width: 0;
        height: 0;
      }

      .edit-profile .btn-save {
        padding: 0.75rem;
        background-color: #4d17e2;
      }

      .edit-profile .button-group {
        max-width: 467px;
      }
    `}</style>
  </>
);

export default EditProfile;

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
