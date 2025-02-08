import { PrismaClient } from '@prisma/client';

class PrismaHandler {
    private static client: PrismaClient;
    constructor() {
        PrismaHandler.client = new PrismaClient();
    }

    public static getInstance() {
        if (!this.client) {
            PrismaHandler.client = new PrismaClient();
        }
        return PrismaHandler.client;
    }
}

export default PrismaHandler.getInstance();
