import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import { PrismaClient ,Prisma}  from '@prisma/client';
import { check, validationResult } from 'express-validator';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {

      await Promise.all([
        check('email').isEmail().withMessage('Invalid email address').run(req),
        check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long').run(req),
        check('name').notEmpty().withMessage('Name is required').run(req),
      ]);

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors.array())
        return res.status(400).json({ errors: errors.array() });
      }

      const {name, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      try {
        console.log('im hereeeeeeeeee\n');
        await prisma.user.create({
          data: {
            username: name,
            email: email,
            password: hashedPassword,
          }
        });
        res.status(200).json({ message: 'User created successfully' });
        ;
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
          return res.status(409).json({ errors: 'Email already exists in the database' });
      }
    }
  } 
  else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
