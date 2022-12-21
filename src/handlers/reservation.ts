import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { isRoomCompatibleWithType } from "../services/reservation/isRoomCompatibleWithType";
import { isRoomReservedAtTime } from "../services/reservation/isRoomReservedAtTime";
import { createReservation } from "../services/reservation/createReservation";
import { getCompatibleRooms } from "../services/reservation/getCompatibleRooms";
import { getReservationById } from "../services/reservation/getReservationById";
import { ReservationBody } from "../types/ReservationBody";

type RoomWithRelations = Prisma.RoomGetPayload<{
    include: {
        equipments: true;
        reservations: true;
    };
}>;

export const postReservation = async (req: Request, res: Response) => {
    const reservation: ReservationBody = req.body;
    const compatibleRooms: RoomWithRelations[] = await getCompatibleRooms(
        reservation
    );

    // if no room config satisfies the request
    if (compatibleRooms.length === 0)
        return res.status(404).json({ message: "No compatible rooms!" });

    let verifiedRoomsForType: RoomWithRelations[] = [];

    // if reunion type isn't compatible with existing rooms
    for (let i = 0; i < compatibleRooms.length; i++) {
        if (
            isRoomCompatibleWithType(
                reservation.type,
                reservation.numberOfPeople,
                compatibleRooms[i].capacity,
                compatibleRooms[i].equipments
            )
        ) {
            verifiedRoomsForType.push(compatibleRooms[i]);
        }
    }

    if (verifiedRoomsForType.length === 0)
        return res.status(404).json({ message: "No compatible rooms!" });

    let verifiedRoomsForTime: RoomWithRelations[] = [];

    // if reunion type is taken at same time or 1 hour before
    for (let i = 0; i < verifiedRoomsForType.length; i++) {
        if (
            !(await isRoomReservedAtTime(
                reservation.startHour,
                verifiedRoomsForType[i]
            ))
        ) {
            verifiedRoomsForTime.push(verifiedRoomsForType[i]);
        }
    }

    if (verifiedRoomsForTime.length === 0)
        return res.status(404).json({
            message: `No compatible rooms available at ${reservation.startHour}:00!`,
        });

    // choose room with minimum capacity
    verifiedRoomsForTime.sort(
        (roomA, roomB) => roomA.capacity - roomB.capacity
    );
    const roomToReserve = verifiedRoomsForTime[0];

    // create reservation
    try {
        const registeredReservation = await createReservation(
            reservation,
            roomToReserve
        );
        return res.json({
            message: `Successful reservation: Your room ${roomToReserve.name} is reserved at ${reservation.startHour}:00. Here's your reservation id: ${registeredReservation.id}`,
        });
    } catch (err) {
        return res.status(500).json({
            message: "Reservation failed to register, please try again!",
        });
    }
};

// get reservation handler
export const getReservation = async (req: Request, res: Response) => {
    const reservationId = req.params.id;

    const reservation = await getReservationById(reservationId);

    console.log(reservation);

    if (!reservation)
        return res.status(404).json({ message: "No reservation found!" });

    return res.json({
        message: `Your reservation is assigned to room ${reservation.room.name} at ${reservation.startHour}:00`,
    });
};
