// import Cookies from "js-cookie";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export function middleware(request) {
    const pathname = request.nextUrl.pathname;
    console.log("pathname", pathname);
    
    const authToken =  cookies().get("token");
    console.log("authToken", authToken);
    
    const protectedRoutes = ["/history", "/quantity-calculator", "/population-calculator", "/cost-calculator", "/profile"];
    
    if (protectedRoutes.includes(pathname) && !authToken) {
        return NextResponse.rewrite(new URL("/login" , request.url));
    }

}
export const config = {
    matcher: [
      /*
       * Match all request paths except for the ones starting with:
       * - api (API routes)
       * - _next/static (static files)
       * - _next/image (image optimization files)
       * - favicon.ico, sitemap.xml, robots.txt (metadata files)
       */
      '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
  }