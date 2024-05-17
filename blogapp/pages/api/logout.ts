import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  
  if (req.method === 'POST') {
    res.setHeader('Set-Cookie', 'token=; Path=/; Max-Age=0');

    res.status(200).json({ message: 'Logged out successfully' });
  }
  else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }

}
