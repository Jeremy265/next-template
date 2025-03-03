import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type Filters = {
    [filterKey: string]: string[];
};

interface FiltersState {
    filters: Filters;
    setFilters: (filters: Filters) => void;
}

export const useFiltersStore = create<FiltersState>()(
    devtools(
        persist(
            (set) => ({
                filters: {},
                setFilters: (filters) => set(() => ({ filters })),
            }),
            {
                name: "filters",
            }
        )
    )
);
