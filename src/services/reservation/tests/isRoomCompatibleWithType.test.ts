import { isRoomCompatibleWithType } from "../isRoomCompatibleWithType";

describe("checking if a room can be reserved for a certain reunion type", () => {
    it("should return true when a room is compatible with reunion type", () => {
        const type = "VC";
        const numberOfPeople = 2;
        const capacity = 20;
        const equipments = [
            { name: "Ecran" },
            { name: "Pieuvre" },
            { name: "Webcam" },
        ];

        expect(
            isRoomCompatibleWithType(type, numberOfPeople, capacity, equipments)
        ).toEqual(true);
    });

    it("should return false when a room isn't compatible with reunion type", () => {
        const type = "VC";
        const numberOfPeople = 2;
        const capacity = 20;
        const equipments = [{ name: "Ecran" }];

        expect(
            isRoomCompatibleWithType(type, numberOfPeople, capacity, equipments)
        ).toEqual(false);
    });
});
