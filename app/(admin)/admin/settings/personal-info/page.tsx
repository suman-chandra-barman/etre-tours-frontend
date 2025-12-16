"use client";

import AdminHeader from "@/components/admin/AdminHeader";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.svg";
import EditCompanyProfileModal from "@/components/modals/EditPersonalInfoModal";

export interface PersonalInfo {
  name: string;
  role: string;
  address: string;
  email: string;
  phone: string;
  description: string;
}

function PersonalInfoPage() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: "Sam Barman",
    role: "Administrator",
    address: "Thanha Phu, HCM City",
    email: "example@mail.com",
    phone: "+123456789",
    description: "Description bio details about yourself",
  });

  const handleSavePersonalInfo = (updatedData: PersonalInfo) => {
    setPersonalInfo(updatedData);
    setIsEditModalOpen(false);
  };

  return (
    <div className="flex-1 overflow-auto p-8 bg-gray-50 ">
      <div className="space-y-8">
        <AdminHeader />

        {/* Back Button */}
        <Link
          href="/admin/settings"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back to Settings</span>
        </Link>

        {/* Company Profile Card */}
        <div className="max-w-xl mx-auto bg-white rounded p-8">
          {/* Logo Section */}
          <div className="space-y-4">
            <div className="rounded-full flex items-center justify-center">
              <Image
                src={logo}
                alt="Company Logo"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>

            {/* Company Name and Description */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {personalInfo.name}
              </h1>
              <p className="text-gray-600 text-sm">
                {personalInfo.description}
              </p>
            </div>
          </div>

          {/* Personal Details Grid */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            {/* Name */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
               Name
              </label>
              <p className="text-gray-900 font-medium mt-1">
                {personalInfo.name}
              </p>
            </div>

            {/* Role */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Role
              </label>
              <p className="text-gray-900 font-medium mt-1">
                {personalInfo.role}
              </p>
            </div>

            {/* Address */}
            <div className="col-span-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Address
              </label>
              <p className="text-gray-900 font-medium mt-1">
                {personalInfo.address}
              </p>
            </div>

            {/* Email */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Email
              </label>
              <p className="text-gray-900 font-medium mt-1">
                {personalInfo.email}
              </p>
            </div>

            {/* Phone */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Phone Number
              </label>
              <p className="text-gray-900 font-medium mt-1">
                {personalInfo.phone}
              </p>
            </div>
          </div>

          {/* Edit Profile Button */}
          <div className="flex justify-end">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="px-6 py-2 border-2 border-gray-900 text-gray-900 font-medium rounded-full hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Edit profile
            </button>
          </div>
        </div>
      </div>

      {/* Edit Personal Profile Modal */}
      <EditCompanyProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        personalInfo={personalInfo}
        onSave={handleSavePersonalInfo}
      />
    </div>
  );
}

export default PersonalInfoPage;
