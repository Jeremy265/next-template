import { Moment } from "moment";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { StationRow } from "../type";

export type Data = {
    inputStations: string;
    stations: StationRow[];
    period: Partial<{
        from: Moment | null;
        to: Moment | null;
    }>;
};

interface DataState {
    data: Data;
    setData: (data: Data) => void;
}

export const useDataStore = create<DataState>()(
    devtools(
        persist(
            (set) => ({
                data: {
                    inputStations: "",
                    stations: [],
                    period: { from: null, to: null },
                },
                setData: (data) => set(() => ({ data })),
            }),
            {
                name: "data",
            }
        )
    )
);
