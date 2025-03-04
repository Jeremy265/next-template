import { NextRequest, NextResponse } from "next/server";
import { LdapUser } from "./lib/type";
import {
    getHeaders,
    getTokenInfo,
    handleMiddlewareRedirection,
    isApiRequest,
    middlewareRedirections,
} from "./lib/utils/middleware.utils";

const handleAuthenticated = async (request: NextRequest, user: LdapUser) => {
    return NextResponse.next({
        request: {
            headers: getHeaders(request, user),
        },
    });
};

export async function middleware(request: NextRequest) {
    if (isApiRequest(request)) return NextResponse.next();

    const token = request.cookies.get("basf_federation_access_token")?.value;

    if (!token) {
        return handleMiddlewareRedirection(
            request,
            middlewareRedirections.unauthorized
        );
    }

    return await getTokenInfo(token)
        .then((tokenInfo) => {
            if (!tokenInfo.user_id)
                return handleMiddlewareRedirection(
                    request,
                    middlewareRedirections.invalidToken
                );
            return fetch(
                `https://app.roqs.basf.net/ldap/api/v2/users/${tokenInfo.user_id}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
                .then((o) => o.json())
                .then(async (ldapUser: LdapUser) =>
                    ldapUser.error
                        ? handleMiddlewareRedirection(
                              request,
                              middlewareRedirections.userNotFound
                          )
                        : handleAuthenticated(request, ldapUser)
                );
        })
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
