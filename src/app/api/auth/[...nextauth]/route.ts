import prisma from "@/app/prisma";
import NextAuth, { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";

type User = {
  name: string;
  email: string;
  refresh_token: string;
  access_token: string;
  access_token_expires_at: number;
};

const clientId = process.env.CLIENT_ID ?? "";
const clientSecret = process.env.CLIENT_SECRET ?? "";

const scopes = [
  "openid",
  "email",
  "profile",
  "https://www.googleapis.com/auth/calendar",
].join(" ");

const options: NextAuthOptions = {
  providers: [
    Google({
      clientId,
      clientSecret,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user && account) {
        const data: User = {
          name: user.name ?? "",
          email: user.email ?? "",
          refresh_token: account?.refresh_token ?? "",
          access_token: account?.access_token ?? "",
          access_token_expires_at: account?.expires_at ?? 0,
        };

        const exists = await prisma.user.findUnique({
          where: {
            email: user.email ?? undefined,
          },
        });

        if (!exists) {
          await prisma.user.create({
            data,
          });
        }
      }

      return token;
    },
    async session({ session }) {
      return session;
    },
  },
};

const handler = NextAuth(options);

export { handler as GET, handler as POST };
