import { auth } from "@/auth";

export const validateUserSession = async () => {
 try {
  const session = await auth();
  if (!session || session === null) {
   return {
    isAuthenticated: false,
    session: null,
    error: "user unauthenticated to perform this operation",
   };
  }
  return {
   isAuthenticated: true,
   session,
   error: null,
  };
 } catch (error) {
  console.error("Failed to fetch session:", error.message);
  return {
   isAuthenticated: false,
   session: null,
   error: "Failed to fetch session",
  };
 }
};
