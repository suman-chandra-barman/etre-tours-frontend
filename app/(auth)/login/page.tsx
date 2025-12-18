"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import logo from "@/public/logo.svg";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContext";
import { UserRole } from "@/types/user";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const { setUser } = useUser();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedRole) {
      alert("Please select a role");
      return;
    }

    // Handle login logic
    // For demo purposes, creating a user with the selected role
    const email = (e.currentTarget as HTMLFormElement).email.value;
    const password = (e.currentTarget as HTMLFormElement).password.value;

    // You would typically validate credentials here
    if (email && password) {
      setUser({
        id: "1",
        name: "User Name",
        email: email,
        role: selectedRole,
      });

      // Redirect based on role
      switch (selectedRole) {
        case "admin":
          router.push("/admin");
          break;
        case "direct-sales":
          router.push("/direct-sales");
          break;
        case "cruise-sales":
          router.push("/cruise-sales");
          break;
        case "partner-sales":
          router.push("/partner-sales");
          break;
      }
    }
  };

  return (
    <main className="h-screen flex items-start xl:items-center justify-center mt-20 xl:mt-0 bg-gray-50">
      <section className="w-full max-w-md p-4 md:p-6 lg:p-8 bg-white rounded-xl">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src={logo}
            alt="Company Logo"
            width={70}
            height={60}
            className="object-contain"
          />
        </div>

        {/* Welcome Text */}
        <div className="text-center mb-8">
          <h2 className=" text-xl md:text-2xl font-bold text-gray-900 mb-1">
            Welcome back!
          </h2>
          <p className="text-gray-500 text-sm">Login to your account</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <Mail size={20} />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              className="w-full pl-12 pr-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <Lock size={20} />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
              className="w-full pl-12 pr-12 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-600">Remember me</span>
            </label>
            <a
              href="#"
              className="text-sm text-blue-500 hover:text-blue-600 transition-colors"
            >
              Forgot Password
            </a>
          </div>

          {/* Role Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Select Role
            </label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                size="sm"
                onClick={() => setSelectedRole("admin")}
                variant={selectedRole === "admin" ? "default" : "outline"}
              >
                Admin
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={() => setSelectedRole("direct-sales")}
                variant={
                  selectedRole === "direct-sales" ? "default" : "outline"
                }
              >
                Direct Sales
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={() => setSelectedRole("cruise-sales")}
                variant={
                  selectedRole === "cruise-sales" ? "default" : "outline"
                }
              >
                Cruise Sales
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={() => setSelectedRole("partner-sales")}
                variant={
                  selectedRole === "partner-sales" ? "default" : "outline"
                }
              >
                Partner Sales
              </Button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl transition-colors shadow-lg shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!selectedRole}
          >
            Login
          </button>
        </form>
      </section>
    </main>
  );
}

export default LoginPage;
