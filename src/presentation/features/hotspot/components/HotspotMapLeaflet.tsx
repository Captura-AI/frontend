"use client";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, GeoJSON, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Map as LeafletMap } from "leaflet";
import type { Feature, Polygon } from "geojson";
import type { Hotspot } from "@/domains/hotspot";

/* ─── Province boundary ─────────────────────────────────────── */
const JABAR_GEOJSON: Feature<Polygon> = {
  type: "Feature",
  properties: { name: "Jawa Barat" },
  geometry: {
    type: "Polygon",
    coordinates: [
      [
        [105.95, -5.95], [106.4, -5.95], [106.85, -6.05], [107.35, -6.1],
        [107.85, -6.2], [108.3, -6.4], [108.6, -6.65], [108.85, -6.95],
        [108.85, -7.3], [108.6, -7.55], [108.2, -7.75], [107.7, -7.85],
        [107.2, -7.8], [106.7, -7.65], [106.3, -7.45], [106.0, -7.2],
        [105.85, -6.85], [105.85, -6.45], [105.95, -5.95],
      ],
    ],
  },
};

const GEOJSON_STYLE = {
  color: "#141311",
  weight: 1.5,
  opacity: 0.55,
  fillColor: "#C04A2B",
  fillOpacity: 0.06,
  dashArray: "4 6",
};

const MAX_BOUNDS: L.LatLngBoundsExpression = [
  [-7.9, 105.7],
  [-5.6, 109.0],
];

/* ─── Pin icon factory ───────────────────────────────────────── */
function makePinIcon(hotspot: Hotspot, isActive: boolean): L.DivIcon {
  return L.divIcon({
    html: `<div class="map-pin-marker ${hotspot.level}${isActive ? " active" : ""}" data-id="${hotspot.id}">
      <div class="map-pin-ring"></div>
      <div class="map-pin-tag">
        <span class="map-pin-name">${hotspot.name}</span>
        <span class="map-pin-count">${hotspot.count} today</span>
      </div>
    </div>`,
    className: "map-pin-icon",
    iconSize: [22, 22],
    iconAnchor: [11, 11],
  });
}

/* ─── Sub-components that use useMap() ──────────────────────── */

function FlyToHandler({
  selectedId,
  hotspots,
}: {
  selectedId: string;
  hotspots: Hotspot[];
}) {
  const map = useMap();
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    const h = hotspots.find((x) => x.id === selectedId);
    if (h) {
      map.flyTo([h.lat, h.lng], Math.max(map.getZoom(), 11), {
        duration: 0.7,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);

  return null;
}

function MapRefCapture({
  mapRef,
}: {
  mapRef: React.MutableRefObject<LeafletMap | null>;
}) {
  const map = useMap();
  useEffect(() => {
    mapRef.current = map;
  }, [map, mapRef]);
  return null;
}

/* ─── Main export ────────────────────────────────────────────── */

interface Props {
  hotspots: Hotspot[];
  center: [number, number];
  selectedId: string;
  onSelect: (id: string) => void;
  mapRef: React.MutableRefObject<LeafletMap | null>;
}

export default function HotspotMapLeaflet({
  hotspots,
  center,
  selectedId,
  onSelect,
  mapRef,
}: Props) {
  return (
    <MapContainer
      center={center}
      zoom={9}
      minZoom={7}
      maxZoom={14}
      zoomControl={false}
      attributionControl
      maxBounds={MAX_BOUNDS}
      maxBoundsViscosity={1.0}
      style={{ height: "100%", width: "100%", position: "absolute", inset: 0 }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution="© OpenStreetMap · © CARTO · Captura"
        subdomains="abcd"
        maxZoom={19}
      />

      <GeoJSON data={JABAR_GEOJSON} style={GEOJSON_STYLE} />

      {hotspots.map((h) => (
        <Marker
          key={h.id}
          position={[h.lat, h.lng]}
          icon={makePinIcon(h, h.id === selectedId)}
          eventHandlers={{ click: () => onSelect(h.id) }}
          zIndexOffset={h.id === selectedId ? 1000 : 0}
        />
      ))}

      <FlyToHandler selectedId={selectedId} hotspots={hotspots} />
      <MapRefCapture mapRef={mapRef} />
    </MapContainer>
  );
}
