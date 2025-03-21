import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);
  console.log(authUser);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };
  return (
    <>
      <div className="h-screen pt-20">
        <div className="max-w-2xl mx-auto p-4 py-8">
          <div className="bg-base-300 rounded-xl p-6 space-y-8 flex flex-col justify-center items-center">
            <h1 className="text-3xl font font-semibold text-center">
              {" "}
              Profile{" "}
            </h1>
            <div>
              <div className="avatar relative">
                <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                  <img
                    src={
                      selectedImage ||
                      authUser.user.profilePic ||
                      authUser.profilePic ||
                      "https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149622024.jpg?t=st=1741870989~exp=1741874589~hmac=4242ab6efd87c15710ca368d68998c0d7826eaf0d5336ef40c97a3a583ccb673&w=826"
                    }
                    className="w-24 h-24 rounded-full object-cover"
                    alt="User Avatar"
                  />
                </div>

                {/* Upload Button */}

                <label
                  htmlFor="avatar-upload"
                  className={` bg-blue-500
      absolute bottom-0 right-0  border-2 border-white  hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200
      ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
    `}
                >
                  <Camera className="w-5 h-5 text-base-200" />
                </label>

                {/* Hidden File Input */}
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </div>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile
                ? "Uploading..."
                : "click on the camera icon to update your photo"}
            </p>
            <label className="input validator ">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>
              <input
                type="email"
                disabled
                className=" text-md px-5"
                placeholder={authUser.email || authUser.user.email}
                required
              />
            </label>
            <label className="input validator ">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </g>
              </svg>
              <input
                type="input"
                disabled
                required
                className="px-5"
                placeholder={authUser.fullName || authUser.user.fullName}
                title="Only letters, numbers or dash"
              />
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
