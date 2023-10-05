import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { emailAddress, password } = req.body;

    try {
      const user = await prisma.users.findFirst({
        where: { email: emailAddress },
      });
      if (!user) {
        res.status(403).json({ string: "Email not found" });
      } else {
        if (user.password == password) {
          res.status(201).json({ user });
        } else {
          res.status(403).json({ body: "Incorrect Password" });
        }
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
