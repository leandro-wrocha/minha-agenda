// core
import { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const clientId = process.env.GOOGLE_CLIENT_ID ?? ''
const clientSecret = process.env.GOOGLE_CLIENT_SECRET ?? ''

const scopes = [
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/calendar.calendarlist',
  'https://www.googleapis.com/auth/calendar.events',
  'https://www.googleapis.com/auth/calendar.events.owned',
  'openid',
  'email',
  'profile'
]

export const authOptions: AuthOptions =  {
  providers: [
    GoogleProvider({
      clientId,
      clientSecret,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: scopes.join(' ')
        },
      },
    })
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    jwt: async ({ account, token }) => {
      if (account) {
        token.access_token = account.access_token
        token.refreh_token = account.refresh_token
      }

      return token
    },
    session: async ({ session, token}) => {
      const tokenAny: any = token
      session.access_token = tokenAny.access_token
      session.refresh_token = tokenAny.refreh_token

      return session;
    }
  }
}

export default authOptions
