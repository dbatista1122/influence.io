import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.send({ message: "Method not allowed." });
  }

  const { firstName, lastName, emailAddress, currentEmailAddress } = req.body;

  // Combine first name and last name into name
  const name = firstName + " " + lastName;

  // Update the name and email in database
  const updatedUser = await prisma.user.update({
    where: {
      email: currentEmailAddress,
    },
    data: {
      name: name,
      email: emailAddress,
    },
  });

  return res.send({ user: updatedUser, message: "User edited successfully." });
}
