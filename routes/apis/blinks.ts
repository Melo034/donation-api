import express from "express";
import * as controller from "../../app/controllers/blink_controller";

const router = express.Router();

router.get('/:id', controller.getBlink);

router.post('/donate/:id', controller.donate);




export default router