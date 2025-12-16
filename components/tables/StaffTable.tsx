"use client";

import { Staff } from "@/types/admin";

interface StaffTableProps {
  staffData: Staff[];
}

export default function StaffTable({ staffData }: StaffTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Staff ID
            </th>
            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contact
            </th>
            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Secondary Contact
            </th>
            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
          </tr>
        </thead>
        <tbody>
          {staffData.map((staff) => (
            <tr
              key={staff.id}
              className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <td className="py-4 px-4 text-sm text-gray-900">{staff.id}</td>
              <td className="py-4 px-4 text-sm text-gray-900">{staff.name}</td>
              <td className="py-4 px-4 text-sm text-gray-900">{staff.role}</td>
              <td className="py-4 px-4 text-sm text-gray-900">
                {staff.contact}
              </td>
              <td className="py-4 px-4 text-sm text-gray-900">
                {staff.secondaryContact}
              </td>
              <td className="py-4 px-4 text-sm text-gray-900">{staff.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
