import { requireSignIn } from "features/auth";
import { Sidebar } from "features/dashboard";
import EditProfileForm from "features/dashboard/components/EditProfileForm";
import type { NextPage } from "next";
import Head from "next/head";

const EditProfile: NextPage = () => (
  <>
    <Head>
      <title>Edit Profile &ndash; StoreGG</title>
    </Head>

    <section className="edit-profile overflow-auto">
      <Sidebar />
      <main className="main-wrapper">
        <div className="ps-lg-0">
          <h1 className="text-4xl fw-bold color-palette-1 mb-30">Settings</h1>
          <div className="bg-card pt-30 ps-30 pe-30 pb-30">
            <EditProfileForm />
          </div>
        </div>
      </main>
    </section>

    <style jsx>{`
      .edit-profile {
        background-color: #fbfcfd;
      }

      .main-wrapper {
        margin-left: 340px;
        height: 100%;
        margin-right: auto;
        position: relative;
        padding: 50px 50px 50px 0px;
      }

      .bg-card {
        background-color: #fff;
        border-radius: 1rem;
        max-width: 590px;
      }
    `}</style>
  </>
);

export default requireSignIn(EditProfile);
