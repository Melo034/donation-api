import * as service from '../services/donation_service';

export async function createDonation(req, res) {
   const body = req.body;
   res.status(201).json(body)
   
}