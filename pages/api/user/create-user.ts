import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // if (req.method !== 'POST') {
  //   return res.status(405).json({ error: 'Method Not Allowed' });
  // }

  try {
    const { name, gender, phoneNumber, city } = req.body;

    const newUser = await prisma.user.create({
      data: {
        name:'shivraj',
        gender:'male',
        phoneNumber:"w4564543245",
        city:"pune",
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
