import { wrapApiCall } from "@/lib/utils/api.utils";
import { NextRequest } from "next/server";

export async function GET(
    _: NextRequest,
    props: { params: Promise<{ postal_code: string }> }
) {
    +console.log(
        "calling",
        `https://www.villes-voisines.fr/getcp.php?cp=${
            (await props.params).postal_code
        }&rayon=30`
    );
    return wrapApiCall(
        async () =>
            await fetch(
                `https://www.villes-voisines.fr/getcp.php?cp=${
                    (
                        await props.params
                    ).postal_code
                }&rayon=30`
            ).then((res) => {
                console.log("res", res);
                return res
                    .json()
                    .then((neighbors: { code_postal: string }[]) => {
                        console.log("neighbors", neighbors);
                        return Array.from(
                            new Set(
                                Object.values(neighbors).map((neighbor) =>
                                    neighbor.code_postal.slice(0, 2)
                                )
                            )
                        );
                    });
            })
    );
}
