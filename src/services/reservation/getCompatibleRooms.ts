import prisma from "../../db";
import { ReservationBody } from "../../types/ReservationBody";

export const getCompatibleRooms = async (
    reservation: ReservationBody
): Promise<any[]> => {
    const compatibleRooms = await prisma.room.findMany({
        where: {
            capacity: {
                // number of people should not exceed 70% of a room capacity
                gte: Math.floor(reservation.numberOfPeople / 0.7),
            },
        },
        include: {
            equipments: true,
            reservations: true,
        },
    });

    return compatibleRooms;
};
