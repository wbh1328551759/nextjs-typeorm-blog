import { withIronSession } from 'next-iron-session';
import { NextApiHandler } from 'next';

export function withSession(handler: NextApiHandler) {
  return withIronSession(handler, {
    password: '0098d721-a67d-4208-ac08-369d19dac88e',
    cookieName: 'blog',
    cookieOptions: {
      secure: false
    }
  });
}
