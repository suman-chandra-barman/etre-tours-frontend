"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { User, UserRole } from "@/types/user";

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  role: UserRole | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  // Start with no user - will be set on login
  const [user, setUser] = useState<User | null>(null);

  const role = user?.role || null;

  // Store role in cookie whenever user changes
  useEffect(() => {
    if (user?.role) {
      document.cookie = `userRole=${user.role}; path=/; max-age=86400`; // 24 hours
    } else {
      // Clear cookie on logout
      document.cookie = "userRole=; path=/; max-age=0";
    }
  }, [user]);

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
