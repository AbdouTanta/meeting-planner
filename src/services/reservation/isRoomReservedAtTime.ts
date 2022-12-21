import { RoomWithRelations } from "../../types/RoomWithRelations";

export const isRoomReservedAtTime = (
    startHour: number,
    room: RoomWithRelations
) => {
    if (room.reservations.length === 0) return false;

    // return true if room is occupied (meeting or cleaning)
    if (
        room.reservations.some(
            (reservation) =>
                reservation.startHour === startHour ||
                reservation.startHour === startHour - 1
        )
    )
        return true;

    return false;
};
