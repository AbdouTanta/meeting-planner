import { Equipment } from "@prisma/client";

export const isRoomCompatibleWithType = (
    type: string,
    numberOfPeople: number,
    capacity: number,
    equipments: Equipment[]
) => {
    const equipmentNames = equipments.map((equipment) => equipment.name);

    if (type === "VC") {
        return (
            equipmentNames.includes("Ecran") &&
            equipmentNames.includes("Pieuvre") &&
            equipmentNames.includes("Webcam")
        );
    }

    if (type === "SPEC") {
        return equipmentNames.includes("Tableau");
    }

    if (type === "RS") {
        return numberOfPeople <= Math.floor(capacity * 0.7);
    }

    if (type === "RC") {
        return (
            equipmentNames.includes("Ecran") &&
            equipmentNames.includes("Pieuvre") &&
            equipmentNames.includes("Tableau")
        );
    }

    return false;
};
