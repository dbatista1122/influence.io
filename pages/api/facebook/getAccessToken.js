import prisma from "../../../lib/prisma";
import { getServerSession } from "next-auth/next";

async function getUserId(email) {
  const userId = await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
    },
  });

  return userId.id;
}

async function getFacebookAccessToken(email) {
  const userId = await getUserId(email);

  // Find the user by email and return the account token if it exists, else return null
  var accountToken = await prisma.AccountToken.findFirst({
    where: {
      userId: userId,
      name: "facebook",
    },
  });

  if (accountToken) {
    // Check if token has expired
    if (accountToken.expires < Date.now()) {
      // Delete the record
      await prisma.AccountToken.delete({
        where: {
          id: accountToken.id,
        },
      });
      accountToken = null;
    }
  }

  return accountToken;
}

export default async function handler(req, res) {
  // Get user email from session
  const session = await getServerSession(req, res);
  const email = session.user.email;

  if (req.method === "GET") {
    // Returns access token if it exists in the database and is not expired, else return error
    try {
      const accountToken = await getFacebookAccessToken(email);

      // Check if user has an access token, will either return an accountToken or return error code 404
      if (accountToken) {
        return res.status(200).json({ accountToken });
      } else {
        return res.status(404).json({ accountToken });
      }
    } catch (error) {
      console.error(
        "Error fetching Facebook access token from database: ",
        error.message
      );
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  if (req.method === "POST") {
    // User does not have an access token, generate one using code and add it to database
    try {
      // Make API call using code to retrieve access token
      const { code, redirectUri } = req.body;
      var clientId = process.env.FACEBOOK_CLIENT_ID;
      var clientSecret = process.env.FACEBOOK_CLIENT_SECRET;
      var address = `https://graph.facebook.com/v18.0/oauth/access_token?client_id=${clientId}&redirect_uri=${redirectUri}&client_secret=${clientSecret}&code=${code}`;
      const response = await fetch(address, {
        method: "GET",
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        return res.status(response.status).json({
          message: `Failed to fetch Facebook access token from API: ${errorMessage}`,
        });
      }

      const data = await response.json();

      // Add access token to database and return the new account token
      const userId = await getUserId(email);
      const accountToken = await prisma.AccountToken.create({
        data: {
          userId: userId,
          name: "facebook",
          accessToken: data.access_token,
          tokenType: data.token_type,
          expires: new Date(Date.now() + 50 * 24 * 60 * 60 * 1000),
        },
      });

      return res.status(200).json({ accountToken });
    } catch (error) {
      console.error("Error fetching Facebook access token: ", error.message);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  if (req.method == "DELETE") {
    // Remove access token from the database to log out user
    const userId = await getUserId(email);

    try {
      const facebookToken = await prisma.accountToken.findFirst({
        where: {
          userId: userId,
          name: "facebook",
        },
      });

      if (facebookToken) {
        await prisma.accountToken.delete({
          where: {
            id: facebookToken.id,
          },
        });
        return res.status(200).json("Facebook token deleted.");
      } else {
        return res.status(404).json("Facebook token not found.");
      }
    } catch (error) {
      return res
        .status(500)
        .json(`Error deleting Facebook token: ${error.message}`);
    }
  }
}
