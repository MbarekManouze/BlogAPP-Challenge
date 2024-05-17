import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient }  from '@prisma/client';
import jwt from 'jsonwebtoken';


const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse){

    if (req.method === 'POST') {

      const token = req.cookies.token;

      if (!token) {
          return res.status(400).json({ error: 'Token is required' });
      }

      if (!process.env.JWT_SECRET) {
          return res.status(500).json({ error: 'JWT secret is not defined' });
      }


      const dToken = jwt.verify(token, process.env.JWT_SECRET);

      if (!dToken) {
          return res.status(404).json({ error: 'Token not found or expired' });
        }
      
        if (typeof dToken === 'string') {
          return res.status(500).json({ error: 'Invalid token format' });
      }

      const { content, title, task, postid } = req.body;
      if (task === "post"){
          try {
              await prisma.blogPost.create({
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
      else if (task === "edit"){
          try {
              await prisma.blogPost.update({
                  where:{
                      id: postid,
                  },
                  data: {
                    title: title,
                    content: content,
                  }
                });
            
              res.status(200).json({msg: "updated"})
          } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
          }

      }
      else if (task === "delete"){
        try {
          await prisma.blogPost.delete({
              where:{
                  id: postid,
              },
            });
        
          res.status(200).json({msg: "deleted"})
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }

      }
    }
    else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  
    
}