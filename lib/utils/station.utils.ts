import { ApiStationFromListDepartement, Coordinates } from "../type";

export const isStationIdValid = (id: string) =>
    id.trim() && !isNaN(Number(id)) && id.length === 8;

const toRadians = (degrees: number): number => {
    return degrees * (Math.PI / 180);
};

const compareCoordinates = (a: Coordinates, b: Coordinates): number => {
    const R = 6371;
    const dLat = toRadians(b.lat - a.lat);
    const dLon = toRadians(b.lon - a.lon);
    const termeHaversine =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(a.lat)) *
            Math.cos(toRadians(b.lat)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const distance =
        R *
        2 *
        Math.atan2(Math.sqrt(termeHaversine), Math.sqrt(1 - termeHaversine));
    return distance;
};

export const orderByClosest = (
    coordinates: Coordinates,
    stations: ApiStationFromListDepartement[]
) => {
    const closestStations: (ApiStationFromListDepartement & {
        distance: number;
    })[] = [];
    for (const station of stations) {
        closestStations.push({
            ...station,
            distance: compareCoordinates(coordinates, {
                lat: Number(station.lat),
                lon: Number(station.lon),
            }),
        });
    }

    return closestStations.sort((a, b) => a.distance! - b.distance!);
};
