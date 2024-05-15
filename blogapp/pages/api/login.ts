import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import prisma from '../../../../prisma';
import jwt from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid password' });
      }
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
