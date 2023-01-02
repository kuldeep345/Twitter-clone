import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    }),
  ],
 callbacks:{
    async session({session,token}){
        session.user.tag = session.user.name.split(" ").join("").toLocaleLowerCase()

        session.user.uid = token.sub

        return session
    }
 },
 secret:process.env.NEXT_PUBLIC_SECRET
}

export default NextAuth(authOptions)