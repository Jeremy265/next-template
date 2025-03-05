import { useDataStore } from "@/lib/stores/data";
import { ApiTown } from "@/lib/type";
import { getTownsByNameOrPostalCode } from "@/lib/utils/api.utils";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useState } from "react";
import AutocompleteField from "./autocomplete.field";

export default function TownField() {
    const { data, setData } = useDataStore();

    const [towns, setTowns] = useState<ApiTown[]>(data.town ? [data.town] : []);

    return (
        <AutocompleteField
            label="Rechercher une commune (nom ou code postal)"
            showAllOptions
            defaultValue={data.town}
            options={towns}
            schema={{
                getOptionLabel: (town) => town.nom,
                getOptionDescription: (town) =>
                    `${town.codesPostaux[0]}, ${town.departement.nom}`,
                primaryKeyField: "code",
            }}
            startAdornment={<LocationOnIcon />}
            onInput={async (nameOrPostalCode) =>
                setTowns(
                    await getTownsByNameOrPostalCode(
                        isNaN(Number(nameOrPostalCode))
                            ? nameOrPostalCode
                            : nameOrPostalCode.padEnd(5, "0")
                    )
                )
            }
            onChange={(town: ApiTown) =>
                setData({
                    ...data,
                    town,
                    coordinates: town
                        ? {
                              lat: town.centre.coordinates[1],
                              lon: town.centre.coordinates[0],
                          }
                        : {},
                })
            }
        />
    );
}
