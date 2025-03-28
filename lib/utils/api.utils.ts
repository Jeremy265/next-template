import { NextResponse } from "next/server";
import HttpError, { errorToString } from "./errors.utils";

export const wrapApiCall = async (f: () => any): Promise<NextResponse> => {
    try {
        return NextResponse.json(await f());
    } catch (error: any) {
        if (error instanceof HttpError)
            return NextResponse.json(error.message, {
                status: error.status,
            });

        if (error.message === "NEXT_HTTP_ERROR_FALLBACK;404")
            return NextResponse.json("Not found", {
                status: 404,
            });

        console.log("Error wrapping API call", error);
        return NextResponse.json(errorToString(error), {
            status: 500,
        });
    }
};
