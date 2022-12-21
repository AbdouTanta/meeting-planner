import { Room } from "@prisma/client";
import prisma from "../../db";
import { ReservationBody } from "../../types/ReservationBody";

export const createReservation = async (
    reservation: ReservationBody,
    room: Room
) => {
    const registeredReservation = await prisma.reservation.create({
        data: {
            number: reservation.numberOfPeople,
            startHour: reservation.startHour,
            type: reservation.type,
            roomId: room.id,
        },
    });

    return registeredReservation;
};
