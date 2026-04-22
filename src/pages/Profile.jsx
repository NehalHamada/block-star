import React, { useRef, useState } from "react";
import { ChangePassword, EditProfile, Header, MyMessages } from "../components";
import { Avatar } from "antd";
import {
  useProfileData,
  useRequestOtp,
  useUpdateImageProfileData,
} from "../hooks/queries/useProfile.js";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Camera } from "lucide-react";
import { useTranslation } from "react-i18next";
import i18n from "../i18n/index.js";

export function Profile() {
  const [activeTab, setActiveTab] = useState("edit-profile");
  const [previewImage, setPreviewImage] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const { t } = useTranslation();
  const { data: userData } = useProfileData();
  const { mutate: requestOtpData, isPending: isRequestingOtp } =
    useRequestOtp();
  const { mutate: updateImageProfileData, isPending: isUploadingImage } =
    useUpdateImageProfileData();

  const queryClient = useQueryClient();
  const fileInputRef = useRef(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const localUrl = URL.createObjectURL(file);
    setPreviewImage(localUrl);

    const formData = new FormData();
    formData.append("image", file);

    updateImageProfileData(formData, {
      onSuccess: (response) => {
        toast.success(response?.message || i18n.t("profile.imageUpdated"));
        queryClient.invalidateQueries({ queryKey: ["profile"] });
      },
      onError: (error) => {
        setPreviewImage(null);
        toast.error(
          error?.response?.data?.message ||
            error?.message ||
            i18n.t("profile.imageError"),
        );
      },
    });

    e.target.value = "";
  };

  const breadcrumbs = [
    { label: t("nav.home"), path: "/" },
    { label: t("profile.title"), path: null },
  ];

  const avatarSrc =
    previewImage ||
    userData?.data?.profile_image_url ||
    "https://tse3.mm.bing.net/th/id/OIP.0KTFoFiqUpEVBetvl5V_pAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3";

  return (
    <div className="w-full">
      <Header breadcrumbs={breadcrumbs} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-8 sm:py-12 md:py-16">
        {/* User Info Section */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between w-full gap-4">
            <div className="text-center flex flex-col sm:flex-row items-center gap-4">
              {/* Clickable Avatar */}
              <div
                className="relative cursor-pointer group flex-shrink-0"
                onClick={handleAvatarClick}
                title={t("profile.changePhoto")}
              >
                <Avatar
                  size={80}
                  src={avatarSrc}
                  className={isUploadingImage ? "opacity-60" : ""}
                />
                <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera size={20} className="text-white" />
                </div>
                {isUploadingImage && (
                  <div className="absolute inset-0 rounded-full flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />

              <h2 className="text-xl sm:text-2xl font-bold text-dark">
                {userData?.data?.name}
              </h2>
            </div>

            {/* Tab Buttons */}
            <div className="flex gap-3 flex-wrap justify-center sm:justify-end">
              <button
                onClick={() => setActiveTab("my-messages")}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === "my-messages"
                    ? "bg-secondary/10 text-secondary"
                    : "bg-gray-100 text-dark-gray hover:bg-gray-200"
                }`}
              >
                {t("profile.messages")}
              </button>
              <button
                onClick={() => {
                  setActiveTab("change-password");
                  if (!otpSent) {
                    requestOtpData(undefined, {
                      onSuccess: () => setOtpSent(true),
                    });
                  }
                }}
                disabled={isRequestingOtp}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === "change-password"
                    ? "bg-secondary/10 text-secondary"
                    : "bg-gray-100 text-dark-gray hover:bg-gray-200"
                }`}
              >
                {t("profile.changePassword")}
              </button>
              <button
                onClick={() => setActiveTab("edit-profile")}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === "edit-profile"
                    ? "bg-secondary/10 text-secondary"
                    : "bg-gray-100 text-dark-gray hover:bg-gray-200"
                }`}
              >
                {t("profile.editProfile")}
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-8">
          {activeTab === "edit-profile" && (
            <EditProfile userData={userData?.data} />
          )}
          {activeTab === "change-password" && <ChangePassword />}
          {activeTab === "my-messages" && <MyMessages />}
        </div>
      </div>
    </div>
  );
}
