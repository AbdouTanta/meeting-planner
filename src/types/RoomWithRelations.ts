import { Prisma } from "@prisma/client";

export type RoomWithRelations = Prisma.RoomGetPayload<{
    include: {
        equipments: true;
        reservations: true;
    };
}>;
