"use client";

import { LatLngExpression } from "leaflet";

import { Circle, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import { useDataStore } from "@/lib/stores/data";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";

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
                <>
                    <Marker position={center} draggable={false}>
                        <Popup>{data.town?.nom ?? "Lieu recherché"}</Popup>
                    </Marker>
                    <Circle
                        center={center}
                        pathOptions={{ color: "white" }}
                        radius={10000}></Circle>
                </>
            )}
        </MapContainer>
    );
};

export default Map;
