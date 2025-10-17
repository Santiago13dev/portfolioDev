import "server-only";

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import env from "@/config/env";
import { customSession } from "better-auth/plugins";


const baseUrl = env.BETTER_AUTH_URL  

export const auth = betterAuth({
    baseURL: baseUrl,
    secret: process.env.BETTER_AUTH_SECRET!, // generate with CLI: npx @better-auth/cli secret
    trustedOrigins: ["http://localhost:3000", baseUrl],

    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),

    session: {
        cookieCache: {
            enabled: true,
            maxAge: 5 * 60,
        },
        expiresIn: 30 * 24 * 60 * 60,
    },

    socialProviders: {
        github: {
            clientId: env.GITHUB_CLIENT_ID,
            clientSecret: env.GITHUB_CLIENT_SECRET,
        },
        google: {
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
        }
    },

    plugins: [
        customSession(async ({ user, session }) => {
            const { role } = await prisma.user.findUnique({
                where: { id: session.userId },
                select: { role: true },
            }) ?? { role: null }

            return {
                role: role as "AUTHOR" | "GUEST",
                user: user,
                session
            };
        }),
    ]




});