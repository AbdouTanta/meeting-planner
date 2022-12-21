import { isRoomReservedAtTime } from "../isRoomReservedAtTime";

describe("checking if a room is free at a certain time", () => {
    it("should return false when a room has no reservations", () => {
        const startHour = 8;
        const room = {
            id: "1",
            name: "E1001",
            capacity: 23,
            equipments: [],
            reservations: [],
        };

        expect(isRoomReservedAtTime(startHour, room)).toEqual(false);
    });

    it("should return false when a room is free at requested time", () => {
        const startHour = 8;
        const reservation = {
            id: "1",
            startHour: 10,
            type: "RS",
            number: 2,
            roomId: "1",
        };
        const room = {
            id: "1",
            name: "E1001",
            capacity: 23,
            equipments: [],
            reservations: [reservation],
        };

        expect(isRoomReservedAtTime(startHour, room)).toEqual(false);
    });

    it("should return true when a room is reserved one hour before requested time", () => {
        const startHour = 11;
        const reservation = {
            id: "1",
            startHour: 10,
            type: "RS",
            number: 2,
            roomId: "1",
        };
        const room = {
            id: "1",
            name: "E1001",
            capacity: 23,
            equipments: [],
            reservations: [reservation],
        };

        expect(isRoomReservedAtTime(startHour, room)).toEqual(true);
    });

    it("should return true when a room is reserved at requested time", () => {
        const startHour = 11;
        const reservation = {
            id: "1",
            startHour: 11,
            type: "RS",
            number: 2,
            roomId: "1",
        };
        const room = {
            id: "1",
            name: "E1001",
            capacity: 23,
            equipments: [],
            reservations: [reservation],
        };

        expect(isRoomReservedAtTime(startHour, room)).toEqual(true);
    });
});
