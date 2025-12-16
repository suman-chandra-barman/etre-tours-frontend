/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import {
  X,
  UserCircle2,
  IdCard,
  Briefcase,
  MapPin,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (staff: any) => void;
}

export default function AddStaffModal({
  isOpen,
  onClose,
  onSubmit,
}: AddStaffModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    staffId: "",
    role: "",
    address: "",
    email: "",
    phoneNumber: "",
    secondaryContact: "",
    status: "",
    hireDate: "",
    employmentType: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    // Reset form
    setFormData({
      name: "",
      staffId: "",
      role: "",
      address: "",
      email: "",
      phoneNumber: "",
      secondaryContact: "",
      status: "",
      hireDate: "",
      employmentType: "",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-3xl bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Add Staff</h2>
            <p className="text-sm text-gray-500 mt-1">
              Please provide the details of your staff members below.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Details Section */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">
              Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {/* Name */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Name
                </Label>
                <div className="relative">
                  <UserCircle2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  <Input
                    id="name"
                    placeholder="Enter name"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="pl-10 h-11 border-gray-400 rounded"
                  />
                </div>
              </div>

              {/* Staff ID */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Staff ID
                </Label>
                <div className="relative">
                  <IdCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  <Input
                    id="staffId"
                    placeholder="Enter staff ID"
                    value={formData.staffId}
                    onChange={(e) => handleChange("staffId", e.target.value)}
                    className="pl-10 h-11 border-gray-400 rounded"
                  />
                </div>
              </div>

              {/* Role */}
              <div className="col-span-2 space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Role
                </Label>
                <div className="relative">
                  <Select
                    value={formData.role}
                    onValueChange={(value) => handleChange("role", value)}
                  >
                    <SelectTrigger className="pl-10 h-11 border-gray-400 rounded">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="guide">Guide</SelectItem>
                      <SelectItem value="driver">Driver</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none z-10" />
                </div>
              </div>

              {/* Address */}
              <div className="col-span-2 space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Address
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  <Input
                    id="address"
                    placeholder="Enter address"
                    value={formData.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    className="pl-10 h-11 border-gray-400 rounded"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="pl-10 h-11 border-gray-400 rounded"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Phone Number
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder="Enter phone number"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      handleChange("phoneNumber", e.target.value)
                    }
                    className="pl-10 h-11 border-gray-400 rounded"
                  />
                </div>
              </div>

              {/* Secondary Contact */}
              <div className="col-span-2 space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Secondary Contact
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  <Input
                    id="secondaryContact"
                    type="tel"
                    placeholder="Enter secondary contact"
                    value={formData.secondaryContact}
                    onChange={(e) =>
                      handleChange("secondaryContact", e.target.value)
                    }
                    className="pl-10 h-11 border-gray-400 rounded"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Work Details Section */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">
              WORK DETAILS
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {/* Status */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Status
                </Label>
                <div className="relative">
                  <Select
                    value={formData.status}
                    onValueChange={(value) => handleChange("status", value)}
                  >
                    <SelectTrigger className="pl-10 h-11 border-gray-400 rounded">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="on-leave">On Leave</SelectItem>
                    </SelectContent>
                  </Select>
                  <CheckCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none z-10" />
                </div>
              </div>

              {/* Hire Date */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Hire Date
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  <Input
                    id="hireDate"
                    type="date"
                    value={formData.hireDate}
                    onChange={(e) => handleChange("hireDate", e.target.value)}
                    className="pl-10 h-11 border-gray-400 rounded [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                  />
                </div>
              </div>

              {/* Employment Type */}
              <div className="col-span-2 space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Employment Type
                </Label>
                <div className="relative">
                  <Select
                    value={formData.employmentType}
                    onValueChange={(value) =>
                      handleChange("employmentType", value)
                    }
                  >
                    <SelectTrigger className="pl-10 h-11 border-gray-400 rounded">
                      <SelectValue placeholder="Select employment type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full Time</SelectItem>
                      <SelectItem value="part-time">Part Time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                    </SelectContent>
                  </Select>
                  <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none z-10" />
                </div>
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="px-6"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="px-6 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Assign Staff
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
