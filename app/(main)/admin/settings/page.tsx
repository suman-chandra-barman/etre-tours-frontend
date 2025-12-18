import AdminHeader from "@/components/admin/AdminHeader";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

function SettingPage() {
  const settingOptions = [
    {
      title: "Company Profile",
      href: "/admin/settings/company-profile",
    },
    {
      title: "Personal Information",
      href: "/admin/settings/personal-info",
    },
    {
      title: "Change Password",
      href: "/admin/settings/change-password",
    },
  ];

  return (
    <div className="flex-1 overflow-auto p-8 bg-gray-50">
      <div className="space-y-8">
        <AdminHeader />

        <div className="max-w-xl">
          <div className="space-y-3">
            {settingOptions.map((option) => (
              <Link
                key={option.title}
                href={option.href}
                className={`flex items-center justify-between border-gray-300 p-3 rounded border transition-all duration-200 hover:bg-gray-100 cursor-pointer`}
              >
                <span className={`font-medium text-sm`}>{option.title}</span>
                <ChevronRight className={`w-4 h-4 `} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingPage;
