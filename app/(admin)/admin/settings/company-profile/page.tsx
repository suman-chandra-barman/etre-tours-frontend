"use client";

import AdminHeader from "@/components/admin/AdminHeader";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import EditCompanyProfileModal from "@/components/modals/EditCompanyProfileModal";
import logo from "@/public/logo.svg";

interface CompanyData {
  companyName: string;
  branch: string;
  address: string;
  email: string;
  phone: string;
  description: string;
}

function CompanyProfilePage() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [companyData, setCompanyData] = useState<CompanyData>({
    companyName: "Company Name",
    branch: "Branch Name",
    address: "Company Address",
    email: "example@mail.com",
    phone: "+123456789",
    description: "Description bio details about company",
  });

  const handleSaveCompanyProfile = (updatedData: CompanyData) => {
    setCompanyData(updatedData);
    setIsEditModalOpen(false);
  };

  return (
    <div className="flex-1 overflow-auto p-8 bg-gray-50">
      <div className="space-y-8">
        <AdminHeader />

        {/* Back Button */}
        <div className="flex items-start">
          <Link
            href="/admin/settings"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back to Settings</span>
          </Link>
        </div>
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
                {companyData.companyName}
              </h1>
              <p className="text-gray-600 text-sm">{companyData.description}</p>
            </div>
          </div>

          {/* Company Details Grid */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            {/* Company Name */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Company Name
              </label>
              <p className="text-gray-900 font-medium mt-1">
                {companyData.companyName}
              </p>
            </div>

            {/* Branch */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Branch
              </label>
              <p className="text-gray-900 font-medium mt-1">
                {companyData.branch}
              </p>
            </div>

            {/* Address */}
            <div className="col-span-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Address
              </label>
              <p className="text-gray-900 font-medium mt-1">
                {companyData.address}
              </p>
            </div>

            {/* Email */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Email
              </label>
              <p className="text-gray-900 font-medium mt-1">
                {companyData.email}
              </p>
            </div>

            {/* Phone */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Phone Number
              </label>
              <p className="text-gray-900 font-medium mt-1">
                {companyData.phone}
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

      {/* Edit Company Profile Modal */}
      <EditCompanyProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        companyData={companyData}
        onSave={handleSaveCompanyProfile}
      />
    </div>
  );
}

export default CompanyProfilePage;
