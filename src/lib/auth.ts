import "server-only";

// Mock auth sin Prisma
export const auth = {
    api: {
        getSession: async () => null,
    },
};
