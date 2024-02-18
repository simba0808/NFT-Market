import { User } from "next-auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

type session = {} | User;

export const middleware = async ( request: NextRequest ) => {

  const headerList = headers();
  const authHeader: string | null = headerList.get("authorization");
  const cookieHeader: string | null = headerList.get("cookie");

  console.log(">>>>>>>>>", authHeader, cookieHeader)

  const session: session = await fetch(`${process.env.SERVER_URL}/api/auth/session`, {
    headers: {
      "authorization": authHeader || "",
      "cookie": cookieHeader || ""
    },
    //cache: "no-store"
  })
  .then( async(res) => (
    await res.json()
  ));

  const loggedIn =  Object.keys(session).length > 0 ? true : false;
  const pathname = request.nextUrl.pathname;

  if( pathname != "/" && !loggedIn ) {
    return NextResponse.redirect(new URL("/", process.env.SEVER_URL));
  }
}

export const config = {
  matcher: ["/:path*"]
}