import Donation from "../models/donation_model";


export async function createDonation(data) {
    const donation = new Donation(data);
    await donation.save();
    
}

export async function getAllDonations() {
    return await Donation.find({});
}


export async function getDonationById(id) {
    const donation = await Donation.findById(id);
    return donation;
}

export async function updateDonation(id, data){
    const donation = await Donation.findByIdAndUpdate(id, data);
    return donation;
}

export async function deleteDonation(id){
    await Donation.findByIdAndDelete(id);
}

