import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import {
    ApiStationFromInformation,
    ApiTown,
    Coordinates,
    Period,
    StationRow,
} from "../type";

export type Data = Partial<{
    inputStations: string;
    stations: StationRow[];
    weatherDataRequestPeriod: Partial<Period>;
    openStationPeriod: Partial<Period>;
    coordinates: Partial<Coordinates>;
    town: ApiTown;
    userPosition: Partial<Coordinates>;
    closestStations: ApiStationFromInformation[];
}>;

interface DataState {
    data: Data;
    setData: (data: Data) => void;
}

export const useDataStore = create<DataState>()(
    devtools(
        persist(
            (set) => ({
                data: {},
                setData: (data) => set(() => ({ data })),
            }),
            {
                name: "data",
            }
        )
    )
);
