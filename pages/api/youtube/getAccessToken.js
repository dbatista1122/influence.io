import prisma from "../../../lib/prisma";
import { getServerSession } from "next-auth/next";

export default async function handler(req, res) {
    const session = await getServerSession(req, res);
    const email = session.user.email;

    if (req.method === "GET") {
        try {
            const accountToken = await getYoutubeAccessToken(email);

            if (accountToken) {
                return res.status(200).json({ accountToken });
            } else {
                return res.status(404).json({ accountToken });
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    if (req.method === "POST") {
        try {
            const { googleToken } = req.body;
            const userId = await getUserId(email);

            const accountToken = await prisma.accountToken.create({
                data: {
                    userId: userId.id,
                    name: "youtube",
                    accessToken: googleToken.access_token,
                    tokenType: googleToken.token_type,
                    expires: new Date(Date.now() + googleToken.expires_in * 1000),
                },
            });

            return res.status(200).json({ accountToken });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    if (req.method === "DELETE") {
        try {
            const youtubeToken = await prisma.accountToken.findFirst({
                where: {
                    userId: (await getUserId(email)).id,
                    name: "youtube",
                },
            });

            if (youtubeToken) {
                await prisma.accountToken.delete({
                    where: {
                        id: youtubeToken.id,
                    },
                });
                return res.status(200).json("YouTube token deleted.");
            } else {
                return res.status(404).json("YouTube token not found.");
            }
        } catch (error) {
            return res.status(500).json(`Error deleting YouTube token: ${error.message}`);
        }
    }
}

async function getUserId(email) {
    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
        select: {
            id: true,
        },
    });

    return user;
}

async function getYoutubeAccessToken(email) {
    const userId = (await getUserId(email)).id;

    const accountToken = await prisma.accountToken.findFirst({
        where: {
            userId: userId,
            name: "youtube",
        },
    });

    if (accountToken && accountToken.expires < Date.now()) {
        await prisma.accountToken.delete({
            where: {
                id: accountToken.id,
            },
        });
        return null;
    }

    return accountToken;
}
