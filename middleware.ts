import NextAuth from 'next-auth';
import authConfig from './auth.config';
import { redirect } from 'next/navigation';

const { auth } = NextAuth(authConfig);

export default auth ((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    if (req.nextUrl.pathname === '/login' && isLoggedIn) {
        redirect('/dashboard')
    }

    if (req.nextUrl.pathname === '/dashboard' && !isLoggedIn) {
        redirect('/login')
    }

    console.log(`Middleware: ${req.nextUrl.pathname}`);
})