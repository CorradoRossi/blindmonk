import ms from 'ms';
import { NextApiRequest, NextApiResponse } from 'next';
import { getAllPlatforms } from '@lib/cms-api';
import { EXPIRES_SECONDS } from '@lib/constants';

export default async function getPlatforms(_: NextApiRequest, res: NextApiResponse) {
  try {
    const allPlatforms = await getAllPlatforms();

    // Set caching headers
    const expires = new Date(Date.now() + ms(`${EXPIRES_SECONDS}s`));
    res.setHeader('Expires', expires.toUTCString());
    res.setHeader(
      'Cache-Control',
      `s-maxage=${EXPIRES_SECONDS}, immutable, must-revalidate, stale-while-revalidate`
    );

    return res.status(200).json(allPlatforms);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);

    return res.status(500).json({
      error: {
        code: 'server_error',
        message: 'Internal server error'
      }
    });
  }
}
