import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import NaverProvider from "next-auth/providers/naver";
import prisma from "@/lib/prisma";

const useSecureCookies =
  process.env.NEXT_PUBLIC_NEXTAUTH_URL?.startsWith("https") ?? false;

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: process.env.NEXT_PUBLIC_NEXTAUTH_URL + "/login",
    signOut: "/",
    error: "/",
    verifyRequest: "/",
    newUser: "/",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID ?? "",
      clientSecret: process.env.NAVER_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      const account = await prisma.account.findFirst({
        where: {
          userId: user.id,
        },
      });

      session.user.id = user.id;
      session.user.provider = account?.provider;
      return session;
    },
  },
  cookies: {
    sessionToken: {
      name: (useSecureCookies ? "__Secure-" : "") + "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies,
        domain: new URL(
          process.env.NEXT_PUBLIC_NEXTAUTH_URL ?? ""
        ).hostname.replace("www.", ""),
      },
    },
  },
});

export { handler as GET, handler as POST };
