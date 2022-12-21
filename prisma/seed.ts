import { rooms } from "./rooms";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    // populate rooms table
    rooms.forEach(async (room) => {
        await prisma.room.create({
            data: {
                name: room.name,
                capacity: room.capacity,
                equipments: {
                    connectOrCreate: room.equipments.map((equipment) => {
                        return {
                            where: equipment,
                            create: equipment,
                        };
                    }),
                },
            },
        });
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
