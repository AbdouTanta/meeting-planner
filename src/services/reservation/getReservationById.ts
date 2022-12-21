import prisma from "../../db";

export const getReservationById = async (id: string) => {
    const reservation = await prisma.reservation.findUnique({
        where: {
            id: id,
        },
        include: { room: true },
    });

    return reservation;
};
