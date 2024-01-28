import NextAuth, { NextAuthOptions } from 'next-auth'
import Google from 'next-auth/providers/google'

const options: NextAuthOptions = {
  providers: [
    Google({
      clientId: '',
      clientSecret: '',
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
          scope: 'https://www.googleapis.com/auth/calendar'
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user, account }) {
      token.refresh_token = account?.refresh_token
      token.expires_at = account?.expires_at
      token.access_token = account?.access_token

      return token
    },
    session({ session, token, user }) {
      const cookies: any = token
      console.log(cookies)

      return session
    },
  }
}

const handler = NextAuth(options)

export { handler as GET, handler as POST }
