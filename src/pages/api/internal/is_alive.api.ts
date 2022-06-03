import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    message: string;
};

const isAlive = (req: NextApiRequest, res: NextApiResponse<Data>): void => {
    res.status(200).json({ message: `I'm alive` });
};

export default isAlive;
