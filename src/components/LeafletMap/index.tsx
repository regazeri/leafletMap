import React, { useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

import { ATTRIBUTION, INITIAL_LAT, INITIAL_LONG, TILELAYER_URL, ZOOM_LEVEL } from '@root/common/constant';
import { AddMarkerToClick } from './MapClickHandler';


/** 
 * @description map initial
*/

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
