import Image from "next/image";
import TextInput from "../../../components/TextInput";
import UploadPhotoIcon from "../../../components/UploadPhotoIcon";

export default function EditProfileForm() {
  return (
    <form>
      <div className="photo d-flex">
        <div className="avatar__wrapper me-20">
          <Image
            className="avatar rounded-circle"
            src={require("../../../features/homepage/assets/avatar-1.jpg")}
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
