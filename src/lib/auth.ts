import "server-only";

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import env from "@/config/env";


const baseUrl = env.BETTER_AUTH_URL  

export const auth = betterAuth({
    baseURL: baseUrl,
    secret: process.env.BETTER_AUTH_SECRET || "fallback-secret-key",
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
            clientId: env.GITHUB_CLIENT_ID || "dummy",
            clientSecret: env.GITHUB_CLIENT_SECRET || "dummy",
        },
        google: {
            clientId: env.GOOGLE_CLIENT_ID || "dummy",
            clientSecret: env.GOOGLE_CLIENT_SECRET || "dummy",
        }
    },
});
