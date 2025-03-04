export const isStationIdValid = (id: string) =>
    id.trim() && !isNaN(Number(id)) && id.length === 8;
