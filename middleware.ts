import { NextRequest, NextResponse } from "next/server";
import { User } from "./lib/type";
import {
    getHeaders,
    handleMiddlewareRedirection,
    isApiRequest,
    middlewareRedirections,
    readToken,
} from "./lib/utils/middleware.utils";

const handleAuthenticated = async (request: NextRequest, user: User) => {
    return NextResponse.next({
        request: {
            headers: getHeaders(request, user),
        },
    });
};

export async function middleware(request: NextRequest) {
    if (isApiRequest(request)) return NextResponse.next();

    const token = "mock"; //request.cookies.get("token")?.value;

    if (!token) {
        return handleMiddlewareRedirection(
            request,
            middlewareRedirections.unauthorized
        );
    }

    return await readToken(token)
        .then((user) =>
            !user
                ? handleMiddlewareRedirection(
                      request,
                      middlewareRedirections.userNotFound
                  )
                : handleAuthenticated(request, user)
        )
        .catch(() =>
            handleMiddlewareRedirection(
                request,
                middlewareRedirections.tokenError
            )
        );
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)", { source: "/" }],
};
