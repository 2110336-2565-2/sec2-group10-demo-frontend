import { API_HOST } from '@/configs'
import NextAuth, { AuthOptions, DefaultSession } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    accessToken?: string
    error: string
  }
}

interface UserLogin {
  username: string
  password: string
}
const login = async (u: UserLogin) => {
  // TODO: wait for backend api docs
  const Endpoint = API_HOST + '/auth/login'
  const body = {
    username: u.username,
    password: u.password,
  }

  const res = await fetch(Endpoint, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })
  const user = await res.json()
  if (res.ok && user) {
    return user
  }
  return null
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'Username' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, _req) {
        if (!credentials) return null

        return await login(credentials)
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const { accessToken, ...restUser } = user as any
        return {
          user: restUser,
          accessToken,
        }
      }

      return token
    },

    async session({ session, token }) {
      if (token) {
        session.user = token.user as DefaultSession['user']
        session.accessToken = token.accessToken as string
        session.error = token.error as string
      }
      return session
    },
  },
}
export default NextAuth(authOptions)
