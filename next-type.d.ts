import * as next from 'next'

declare module 'next' {
  import { Session } from 'next-iron-session';

  interface NextApiRequest {
    session: Session
  }
}
