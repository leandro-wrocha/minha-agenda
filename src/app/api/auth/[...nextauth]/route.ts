import NextAuth from "next-auth/next"

// config
import { authOptions } from "@/config/auth-options"

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
