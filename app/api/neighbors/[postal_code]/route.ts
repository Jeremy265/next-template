import { wrapApiCall } from "@/lib/utils/api.utils";
import { NextRequest } from "next/server";
import fetch from "node-fetch";

export async function GET(
    _: NextRequest,
    props: { params: Promise<{ postal_code: string }> }
) {
    return wrapApiCall(
        async () =>
            await fetch(
                `https://www.villes-voisines.fr/getcp.php?cp=${
                    (
                        await props.params
                    ).postal_code
                }&rayon=30`
            ).then((res) =>
                (
                    res.json() as unknown as Promise<{ code_postal: string }[]>
                ).then((neighbors: { code_postal: string }[]) =>
                    Array.from(
                        new Set(
                            Object.values(neighbors).map((neighbor) =>
                                neighbor.code_postal.slice(0, 2)
                            )
                        )
                    )
                )
            )
    );
}
