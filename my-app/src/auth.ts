import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        identifier: { label: "Email or Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();

        if (!credentials) return null;

        const { identifier, password } = credentials as {
          identifier: string;
          password: string;
        };

        if (!identifier || !password) return null;

        const user = await UserModel.findOne({
          $or: [{ email: identifier }, { username: identifier }],
        });

        if (!user) throw new Error("No user found");
        if (!user.isVerified)
          throw new Error("Please verify your account");

        const ok = await bcrypt.compare(
          password,
          user.password as string
        );
          
        
        if (!ok) throw new Error("Incorrect password");

        return {
          id: user._id.toString(),
          email: user.email,
          username: user.username,
          isVerified: user.isVerified,
          isAcceptingMessages: user.isAcceptingMessages,
        };
      },
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.isVerified = user.isVerified;
        token.isAcceptingMessages = user.isAcceptingMessages;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
        session.user.isVerified = token.isVerified as boolean;
        session.user.isAcceptingMessages =
          token.isAcceptingMessages as boolean;
      }
      return session;
    },
  },

  pages: { signIn: "/sign-in" },
  secret: process.env.NEXTAUTH_SECRET,
});
