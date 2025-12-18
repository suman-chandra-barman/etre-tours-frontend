"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { User, UserRole } from "@/types/user";

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  role: UserRole | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  // Default user for demo - replace with actual auth logic
  const [user, setUser] = useState<User | null>({
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
  });

  const role = user?.role || null;

  return (
    <UserContext.Provider value={{ user, setUser, role }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
