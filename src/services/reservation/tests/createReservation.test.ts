import { prismaMock } from "../../../singleton";
import { createReservation } from "../createReservation";

describe("create reservation in database", () => {
    it("should create reservation", async () => {
        const reservationBody = {
            numberOfPeople: 10,
            startHour: 8,
            type: "RS",
        };
        const room = { id: "1", name: "E1001", capacity: 23, equipments: [] };

        const reservation = {
            id: "1",
            ...reservationBody,
            number: reservationBody.numberOfPeople,
            roomId: room.id,
        };

        prismaMock.reservation.create.mockResolvedValue(reservation);

        await expect(createReservation(reservationBody, room)).resolves.toEqual(
            reservation
        );
    });
});
