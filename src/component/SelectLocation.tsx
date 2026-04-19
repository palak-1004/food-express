"use client";

import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useLocationStore } from "../types/useLocationStore";
import type { LeafletMouseEvent } from "leaflet";
import { useNavigate } from "react-router-dom";


function LocationMarker({
    setLocation,
    setAddress,
}: {
    setLocation: (loc: [number, number]) => void;
    setAddress: (addr: string) => void;
}) {
    useMapEvents({
        async click(e: LeafletMouseEvent) {
            const lat = e.latlng.lat;
            const lng = e.latlng.lng;

            setLocation([lat, lng]);

            try {
                const res = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
                );
                const data = await res.json();

                setAddress(data.display_name || "Selected Location");
            } catch {
                setAddress("Selected Location");
            }
        },
    });

    return null;
}

export default function SelectLocation() {
    const [address, setAddress] = useState<string>("");
    const [suggestions, setSuggestions] = useState<any[]>([]);

    const [location, setLocation] = useState<[number, number]>([
        28.6139,
        77.2090,
    ]);

    const setGlobalLocation = useLocationStore(
        (state) => state.setLocation
    );

    // Current
    const handleCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const lat = pos.coords.latitude;
                const lng = pos.coords.longitude;

                setLocation([lat, lng]);
                getAddressFromCoords(lat, lng);
            },
            (err) => {
                console.error(err);
                alert("Location permission denied");
            }
        );
    };

    // Street map search
    const handleSearch = async (value: string) => {
        setAddress(value);

        if (value.length < 3) {
            setSuggestions([]);
            return;
        }

        const res = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${value}&format=json`
        );
        const data = await res.json();
        setSuggestions(data);
    };

    const handleSelect = (place: any) => {
        setAddress(place.display_name);

        setLocation([
            parseFloat(place.lat),
            parseFloat(place.lon),
        ]); 

        setSuggestions([]);
    };
    const getAddressFromCoords = async (lat: number, lng: number) => {
        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
            );
            const data = await res.json();

            setAddress(data.display_name || "Selected Location");
        } catch (err) {
            console.error(err);
            setAddress("Selected Location");
        }
    };
    const navigate = useNavigate();
    return (
        <div className="p-4 space-y-4 max-w-md mx-auto">

            <div>
                <input
                    value={address}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Enter delivery location"
                    className="w-full p-3 border rounded-lg"
                />

                <div className="bg-white shadow rounded">
                    {suggestions.map((place, index) => (
                        <div
                            key={index}
                            onClick={() => handleSelect(place)}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                        >
                            {place.display_name}
                        </div>
                    ))}
                </div>
            </div>

x            <button
                onClick={handleCurrentLocation}
                className="w-full p-3 bg-green-500 text-white rounded-lg"
            >
                Use Current Location
            </button>

            <MapContainer
                center={location}
                zoom={15}
                style={{ width: "100%", height: "300px" }}
            >
                <TileLayer
                    attribution="&copy; OpenStreetMap"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker position={location} />
                <LocationMarker
                    setLocation={setLocation}
                    setAddress={setAddress}
                />            </MapContainer>

            <button
                className="w-full p-3 bg-black text-white rounded-lg"
                onClick={() => {
                    const coords = {
                        lat: location[0],
                        lng: location[1],
                    };

                    setGlobalLocation(coords, address);

                    navigate("/home");
                }}
            >
                Confirm Location
            </button>
        </div>
    );
}