import NextAuth from "next-auth";
import type { NextAuthConfig, User } from "next-auth";
import credentials from "next-auth/providers/credentials";



const config: NextAuthConfig = {
    pages: {
        signIn: '/sign-in',

    },
    providers: [credentials({
        async authorize(credentials: any, request) {
            const user = JSON.parse(credentials.user)
            // console.log(user)
            return user;
        },
    })],
    callbacks: {
        async authorized({ request, auth }) {
            const inAuthPages = request.nextUrl.pathname.includes('sign-');
            const isLoggedIn = !!auth?.user;

            if (!isLoggedIn && inAuthPages)
                return true
            if (isLoggedIn && inAuthPages)
                return Response.redirect(new URL('/', request.nextUrl));

            return isLoggedIn;
        },
        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }


            return session
        },
    }


}

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth(config);