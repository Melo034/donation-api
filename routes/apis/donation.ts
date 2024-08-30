import express from 'express';
const router = express.Router();
import * as controller  from '../../app/controllers/donation_service';

router.post('/create', controller.createDonation);
router.get('/all', controller.getAllDonations);
router.get('/:id', controller.getDonationById);
router.put('/update/:id', controller.updateDonation);
router.delete('/delete/:id', controller.deleteDonation);

export default router;