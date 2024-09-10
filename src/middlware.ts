import {NextRequest, NextResponse} from "next/server";
export {default} from "next-auth/middleware";
import {getToken} from "next-auth/jwt";

export async function middleware(req: NextRequest, res: NextResponse){
    const token = await getToken({req});
    const url = req.nextUrl

    if(token && 
        (
            url.pathname.startsWith('/sign-in') ||
            url.pathname.startsWith('/sign-up') ||
            url.pathname.startsWith('/verify') ||
            url.pathname.startsWith('/') ||
            url.pathname.startsWith('/forgot-password')
        )
    ){
        return NextResponse.redirect(new URL("/dashboard", req.url));

    }

    return NextResponse.redirect(new URL("/home", req.url));
}

export const config = {
    matcher:[
        "/",
        "/sign-in",
        "/sign-up",
        "/forgot-password",
        "/reset-password",
        "/verify-email",
        "/verify-email/:path*",
        "/reset-password/:path*",
        '/dashboard/:path*',
        '/verify/:path*',
    ]
};