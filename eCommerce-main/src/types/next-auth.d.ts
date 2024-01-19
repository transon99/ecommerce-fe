import NextAuth from "next-auth";

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    tokens: Tokens;
    provider?: string;
  }
}
