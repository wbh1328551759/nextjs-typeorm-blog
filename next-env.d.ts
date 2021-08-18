/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference types="next/image-types/global" />
import * as next from 'next'
import { Session } from 'next-iron-session';

declare module 'next'{
  interface NextApiRequest {
    session: Session
  }
}
