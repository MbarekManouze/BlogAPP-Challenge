import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import { PrismaClient ,Prisma}  from '@prisma/client';
import jwt from 'jsonwebtoken';
import cookie from 'js-cookie'; 


const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse){

    if (req.method === 'POST') {

        const token = req.cookies.token;
        console.log("got the token : ", token);

        const dToken = jwt.verify(token, process.env.JWT_SECRET);
        
        console.log("token decoded : ", dToken);
        const { content, title } = req.body;

        try {
            const newBlogPost = await prisma.blogPost.create({
                data: {
                  title: title,
                  content: content,
                  authorId: dToken.userId
                }
              });
          
            res.status(200).json({msg: "created"})
        } catch (error) {
          res.status(500).json({ error: 'Internal server error' });
        }
      } 
      else {
        res.status(405).json({ error: 'Method Not Allowed' });
      }
    
    
}