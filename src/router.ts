import { Router } from "express";
import { body } from "express-validator";
import { postReservation, getReservation } from "./handlers/reservation";
import { handleInputErrors } from "./middleware/handleInputErrors";

const router = Router();

router.post(
    "/reservation",
    body("startHour")
        .isInt({ max: 19, min: 8 })
        .withMessage("Reservation time must be between 8 and 19"),
    body("type")
        .isIn(["VC", "SPEC", "RS", "RC"])
        .withMessage("Accepted types are: VC, SPEC, RS and RC"),
    body("numberOfPeople").isInt(),
    handleInputErrors,
    postReservation
);

router.get("/reservation/:id", getReservation);

export default router;
