import * as service from '../services/donation_service';
import { ActionGetResponse, ActionPostRequest, ACTIONS_CORS_HEADERS } from '@solana/actions';
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';

export async function getBlink(req, res) {
    const id = req.params.id;
    const baseUrl = `${req.protocol}://${req.get('host')}`;

    try {
        const donation = await service.getDonationById(id);

        const payload: ActionGetResponse = {
            icon: "https://arweave.net/QFKBRpChj18jLiwqSSrPvZEpR2Jryrot-gLKmqZJ8CQ",
            label: "Donation",
            title: donation.title,
            description: donation.description,
            type: "action",
            links: {
                actions: [
                    {
                        label: "Send 1 SOL 🙂",
                        href: `${baseUrl}/api/donations/${id}?amount=1`
                    },
                    {
                        label: "Send 2 SOL 😎",
                        href: `${baseUrl}/api/donations/${id}?amount=2`
                    },
                    {
                        label: "Donate",
                        href: `${baseUrl}/api/donations/${id}?amount={amount}`,
                        parameters: [
                            {
                                name: "amount",
                                label: "Enter the amount of SOL to donate"
                            }
                        ]
                    }
                ]
            }
        };

        res.set(ACTIONS_CORS_HEADERS);
        res.status(200).json(payload);

    } catch (error) {
        console.log(error);
        res.set(ACTIONS_CORS_HEADERS);
        return res.status(500).json("An unknown error occurred");
    }
}

export async function donate(req, res) {
    const id = req.params.id;
    const amountStr = req.query.amount;
    const amount = amountStr ? parseFloat(amountStr) : 0;

    try {
        console.log('req.body: ', req.body);
        const donation = await service.getDonationById(id);

        if (!donation || !donation.address) {
            return res.status(404).json("Donation address not found");
        }

        const body: ActionPostRequest = req.body;

        let account: PublicKey;

        if (!body.account) {
            return res.status(400).json("Account information is required");
        }

        account = new PublicKey(body.account);

        const conn = new Connection(clusterApiUrl("devnet"), "confirmed");

        const minimumBalance = await conn.getMinimumBalanceForRentExemption(0);

        if (amount * LAMPORTS_PER_SOL < minimumBalance) {
            return res.status(400).json("Account may not be rent-exempt");
        }

        const transaction = new Transaction();

        transaction.add(
            SystemProgram.transfer({
                fromPubkey: account,
                toPubkey: new PublicKey(donation.address),
                lamports: amount * LAMPORTS_PER_SOL
            })
        );

        transaction.feePayer = account;
        transaction.recentBlockhash = (await conn.getLatestBlockhash()).blockhash;

        // Construct payload for ActionPostRequest
        const payload: ActionPostRequest = {
            account: body.account, // Ensure 'account' is included as it's required
            // Other required fields based on ActionPostRequest definition
        };

        res.set(ACTIONS_CORS_HEADERS);
        res.status(201).json(payload);

    } catch (error) {
        console.log(error);
        res.set(ACTIONS_CORS_HEADERS);
        return res.status(500).json("An unknown error occurred");
    }
}
