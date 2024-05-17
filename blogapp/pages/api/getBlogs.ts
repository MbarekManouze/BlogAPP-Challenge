import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient }  from '@prisma/client';

const prisma = new PrismaClient();


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'GET'){

        try{

            const Blogs = await prisma.blogPost.findMany({
                include: {
                    author: true
                  }
            });
            res.status(200).json({ Blogs });

        }catch (error){
            res.status(500).json({error: "Internal server error"});
        }
    }
    else{
        res.status(405).json({msg : "Method Not Allowed"});
    }

}