import { NextRequest, NextResponse } from "next/server";
import { LdapUser, MiddlewareRedirection } from "../type";
import { isApiRequest } from "./api.utils";

const getResponseError = (
    status: number,
    apiMessage: string,
    appRedirectionUrl: string
): MiddlewareRedirection[keyof MiddlewareRedirection] => ({
    status,
    apiMessage,
    appRedirectionUrl,
});

export const middlewareRedirections: MiddlewareRedirection = {
    unauthorized: getResponseError(
        401,
        "Vous devez être authentifé pour accéder à cette ressource.",
        "/errors/authentication/unauthorized"
    ),
    invalidToken: getResponseError(
        401,
        "Le token de connexion n'est pas valide.",
        "/errors/authentication/token/invalid"
    ),
    tokenError: getResponseError(
        500,
        "Une erreur est survenue à la lecture du token de connexion.",
        "/errors/authentication/token"
    ),
    userNotFound: getResponseError(
        404,
        "Aucun utilisateur ne correspond au token de connexion.",
        "/errors/authentication/user/not-found"
    ),
};

export const getHeaders = (request: NextRequest, user: LdapUser) => {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("next-url", request.nextUrl.pathname);
    requestHeaders.set("authenticated-user", JSON.stringify(user));
    return requestHeaders;
};

export const handleMiddlewareRedirection = (
    request: NextRequest,
    error: MiddlewareRedirection[keyof MiddlewareRedirection],
    headers?: Headers
) => {
    const status = { status: error.status };
    if (isApiRequest(request))
        return NextResponse.json(error.apiMessage, status);
    return NextResponse.rewrite(new URL(error.appRedirectionUrl, request.url), {
        ...status,
        request: {
            headers: headers,
        },
    });
};

export const getTokenInfo = async (token: string): Promise<any> =>
    fetch("https://app.roqs.basf.net/auth/token2info", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token: token.replace("Bearer ", "").trim(),
        }),
    }).then((response) => response.json());
