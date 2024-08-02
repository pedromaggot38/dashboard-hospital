import NextAuth from "next-auth"
import authConfig from "./auth.config"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  //adapter: PrismaAdapter(prisma)
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/login",
  },
  ...authConfig
})