export type UserRole =
  | "admin"
  | "direct-sales"
  | "cruise-sales"
  | "partner-sales";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
