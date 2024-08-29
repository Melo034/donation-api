import express from 'express';
const router = express.Router();
import * as controller  from '../../app/controllers/donation_service';

router.post('/create', controller.createDonation);

export default router;