import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import { PrismaClient }  from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const {name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log(hashedPassword);
    try {
      console.log('im hereeeeeeeeee\n');
      const user = await prisma.user.create({
        data: {
          username: name,
          email: email,
          password: hashedPassword,
        }
      });
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
      res.status(200).json({ token });
    } catch (error) {
      console.log("error : ", error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
