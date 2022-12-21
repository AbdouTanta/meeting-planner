import { prismaMock } from "../../../singleton";
import { getReservationById } from "../getReservationById";

describe("get reservation info from database", () => {
    it("return reservation object when found", async () => {
        const reservation = {
            id: "1",
            number: 20,
            startHour: 8,
            type: "RS",
            roomId: "1",
        };

        prismaMock.reservation.findUnique.mockResolvedValue(reservation);

        expect(await getReservationById("1")).toEqual(reservation);
    });
});
