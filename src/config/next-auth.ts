import { AuthOptions } from "next-auth";
import Github from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const clientId = process.env.GOOGLE_CLIENT_ID ?? ''
const clientSecret = process.env.GOOGLE_CLIENT_SECRET ?? ''

const authOptions: AuthOptions =  {
  providers: [
    GoogleProvider({
      clientId,
      clientSecret,
    }),
    Github({
      clientId: '1d50c1e2b68cb717ae9e',
      clientSecret: '207621664f6abb0a823bcd1c9aad700bbcbfb6e5'
    })
  ],
  secret: 'teste',
}

export default authOptions