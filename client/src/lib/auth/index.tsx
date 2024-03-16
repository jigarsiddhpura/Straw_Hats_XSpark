import { getServerSession, type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/lib/db";
import "dotenv/config";
import { users } from "@/lib/db/schema/users";
import { eq } from "drizzle-orm";

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db),
  secret: process.env["NEXTAUTH_SECRET"]!,
  providers: [
    GoogleProvider({
      clientId: process.env["GOOGLE_CLIENT_ID"]!,
      clientSecret: process.env["GOOGLE_CLIENT_SECRET"]!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token["id"];
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.image = token["image"] as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      const dbUser = (
        await db
          .select()
          .from(users)
          .where(eq(users.email, token.email as string))
      )[0];
      if (!dbUser) {
        token["id"] = user.id;
        return token;
      }
      return {
        id: dbUser.id as unknown as string,
        email: dbUser.email,
        name: dbUser.name,
        image: dbUser.image,
        role: dbUser.role,
      };
    },
    redirect() {
      return "/";
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
