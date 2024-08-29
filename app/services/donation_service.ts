import * as repo from '../repositories/donation_repository';


export async function createDonation(data) {
    await repo.createDonation(data);
}

export async function getAllDonations() {
    return await repo.getAllDonations();
}

export async function getDonationById(id) {
    return await repo.getDonationById(id);
}

export async function updateDonation(id, data) {
    return await repo.updateDonation(id, data);
}

export async function deleteDonation(id) {
    await repo.deleteDonation(id);
}