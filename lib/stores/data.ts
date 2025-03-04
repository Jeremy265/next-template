import { Moment } from "moment";
import { StationRow } from "../type";
import useCustomStore from "./store";

type Data = {
    inputStations: string;
    stations: StationRow[];
    period: Partial<{
        from: Moment | null;
        to: Moment | null;
    }>;
};

export const useDataStore = () => {
    const store = useCustomStore<Data>("data", {
        inputStations: "",
        stations: [],
        period: { from: null, to: null },
    });
    return { data: store.state, setData: store.setState };
};
