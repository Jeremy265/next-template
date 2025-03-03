export enum HttpStatusCode {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOWED = 405,
    CONFLICT = 409,
    INTERNAL_SERVER_ERROR = 500,
    NOT_IMPLEMENTED = 501,
}

export default class HttpError extends Error {
    public status: HttpStatusCode;

    constructor(error: { status: HttpStatusCode; message: string }) {
        super(error.message);
        this.status = error.status || HttpStatusCode.INTERNAL_SERVER_ERROR;
        this.message = error.message || "Une erreur inconnue est survenue";
    }

    toString(): string {
        return `Erreur ${this.status} : ${this.message}`;
    }
}

export function errorToString(error: unknown) {
    if (error instanceof HttpError) {
        return error.toString();
    }
    if (error instanceof Error) {
        return error.message;
    }
    return String(error);
}
