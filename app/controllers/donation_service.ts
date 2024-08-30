import * as service from '../services/donation_service';

export async function createDonation(req, res) {
   const body = req.body;
   try {
      const donation = await service.createDonation(body);
      return res.status(201).json(donation);
   }catch (error) {
      res.status(500).json({message:error.message});
   }  
}

export async function getAllDonations(req, res) {
   try {
      const donation = await service.getAllDonations();
      return res.status(200).json(donation);
   }catch (error) {
      return res.status(500).json({message:error.message});
   }  
   

}

export async function getDonationById(req, res) {
   try {
      const donation = await service.getDonationById(req.params.id);
      return res.status(200).json(donation);
   }catch (error) {
      return res.status(500).json({message:error.message});
   }  
}


export async function updateDonation(req, res) {
   const donation = await service.updateDonation(req.params.id, req.body);
   return res.status(200).json(donation);
}


export async function deleteDonation(req, res) {
   await service.deleteDonation(req.params.id);
   return res.status(204).end();
}