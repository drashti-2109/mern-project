import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Fix marker issue with Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const LiveTracking = () => {
  const [currentPosition, setCurrentPosition] = useState({
    lat: 51.505,
    lng: -0.09,
  });

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCurrentPosition({ lat: latitude, lng: longitude });
    });

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  const zoomControlStyle = `
  .leaflet-top.leaflet-right {
    top: 62% !important;
    transform: translateY(-50%);
    right: 5px !important;
  }
`;

  const RecenterMap = ({ position }) => {
    const map = useMap();
    useEffect(() => {
      map.setView(position, map.getZoom());
    }, [position]);
    return null;
  };

  return (
    <div className="w-full h-full pointer-events-auto">
    <style>{zoomControlStyle}</style>
      <MapContainer
        center={currentPosition}
        zoom={15}
        scrollWheelZoom={true}
        style={{ width: '100%', height: '100%' }}
        dragging={true}       
        doubleClickZoom={true}
        zoomControl={false}
      >
        <ZoomControl position="topright" />
        <RecenterMap position={currentPosition} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <Marker position={currentPosition} />
      </MapContainer>
    </div>
  );
};

export default LiveTracking;
