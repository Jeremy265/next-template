"use client";

import { useDataStore } from "@/lib/stores/data";
import { LatLngExpression } from "leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer, Tooltip } from "react-leaflet";
import Aligned from "../generic/aligned";

const Map = () => {
    const { data } = useDataStore();
    const center =
        data.coordinates?.lat && data.coordinates.lon
            ? ([
                  data.coordinates?.lat,
                  data.coordinates?.lon,
              ] as LatLngExpression)
            : undefined;

    const userPosition =
        data.userPosition?.lat && data.userPosition.lon
            ? ([
                  data.userPosition?.lat,
                  data.userPosition?.lon,
              ] as LatLngExpression)
            : undefined;

    return (
        <MapContainer
            center={center ?? userPosition ?? [45.7767823, 4.7838083]}
            zoom={10}
            style={{ height: "400px", width: "100%" }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {userPosition && (
                <Marker position={userPosition} draggable={false}>
                    <Popup>Vous êtes ici</Popup>
                </Marker>
            )}
            {center && (
                <Marker position={center} draggable={false}>
                    <Popup>{data.town?.nom ?? "Lieu recherché"}</Popup>
                </Marker>
            )}
            {data.closestStations?.map((station) => {
                const position = station.positions.find(
                    (position) =>
                        !position.dateFin ||
                        position.dateFin === station.dateFin
                )!;

                return (
                    <Marker
                        key={station.id}
                        position={[position.latitude, position.longitude]}>
                        <Tooltip>
                            <Aligned col>
                                <span>
                                    {station.id}, {Math.round(station.distance)}{" "}
                                    km
                                </span>
                                <span>{station.nom}</span>
                            </Aligned>
                        </Tooltip>
                    </Marker>
                );
            })}
        </MapContainer>
    );
};

export default Map;
