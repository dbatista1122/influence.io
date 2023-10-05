import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { firstName, lastName, emailAddress, password } = req.body;

    try {
      const user = await prisma.users.create({
        data: {
          firstname: firstName,
          lastname: lastName,
          email: emailAddress,
          password: password, // You should hash the password before storing it securely.
        },
      });

      res.status(201).json({ user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
