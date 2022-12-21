import { getCompatibleRooms } from "../getCompatibleRooms";

describe("get array of compatible rooms for a reservation", () => {
    it("should return an empty array if no room matches the reservation capacity", async () => {
        const reservation = {
            startHour: 8,
            type: "RS",
            numberOfPeople: 1000,
        };

        expect(await getCompatibleRooms(reservation)).toHaveLength(0);
    });
});
