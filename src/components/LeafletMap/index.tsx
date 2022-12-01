import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';

import useElevation from '@root/hooks/useElevation';
import { useStore } from '@root/store/store';
import { ATTRIBUTION, INITIAL_LAT, INITIAL_LONG, TILELAYER_URL, ZOOM_LEVEL } from '@root/common/constant';

function AddMarkerToClick() {
  const [latLng, setLatLng] = useState({ lat: null, lng: null });
  const { data, refetch, isLoading, isRefetching,error } = useElevation(latLng.lat, latLng.lng);
  const { submitLocation, locations } = useStore();

  const map = useMapEvents({
    click(e) {
      setLatLng({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  useEffect(() => {
    if (latLng.lat !== null && latLng.lng !== null) {
      refetch();
    }
  }, [latLng]);
  useEffect(() => {
    if (data && !isLoading && !isRefetching) {
      const elevation = data.results[0].elevation;
      submitLocation({ lat: latLng.lat, lng: latLng.lng, description: 'Submit By Click', elevation });
    }
    if(error) {
      submitLocation({ lat: latLng.lat, lng: latLng.lng, description: 'Submit By Click', elevation:'Not provided',errorMessage:'error' });
    }
  }, [data]);
  return (
    <>
      {locations.map((location, idx) => (
        <Marker key={idx} position={[location.lat, location.lng]}>
          <Popup>Marker is at {location}</Popup>
        </Marker>
      ))}
    </>
  );
}

export const LeafletMap: React.FC = () => {
  const MapRef = useRef();
  return (
    <div>
      <MapContainer
        center={[INITIAL_LAT, INITIAL_LONG]}
        zoom={ZOOM_LEVEL}
        scrollWheelZoom={false}
        style={{ height: '100vh', width: '95%', margin: '10px auto' }}
        ref={MapRef}
      >
        <TileLayer attribution={ATTRIBUTION} url={TILELAYER_URL} />
        <AddMarkerToClick />
      </MapContainer>
    </div>
  );
};
