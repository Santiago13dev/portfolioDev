// Mock Prisma client sin base de datos
const prisma = {
    user: {
        findUnique: async () => null,
    },
    todo: {
        findMany: async () => [],
    },
};

export default prisma;
