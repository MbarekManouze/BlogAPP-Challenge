import { NextApiRequest, NextApiResponse } from "next";
import jwt from 'jsonwebtoken';


export default async function handler(req: NextApiRequest, res: NextApiResponse){

    if (req.method === 'GET') {
        try{
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
    
            res.status(200).json({id: dToken.userId});
        }
        catch(error){
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  
}