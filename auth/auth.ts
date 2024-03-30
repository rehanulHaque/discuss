import { db } from "@/db";
import GitHub from "@auth/core/providers/github";
import Google from "@auth/core/providers/google";

import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";


export const {handlers: {GET, POST}, auth, signIn, signOut} =  NextAuth({
    adapter: PrismaAdapter(db),
    providers: [
        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUIB_CLIENT_SECRET!,
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        })
    ],
    callbacks: {
        async session({session, user}: any){
            if(session && user){
                session.user.id = user.id
            }
            return session
        }
    }
});