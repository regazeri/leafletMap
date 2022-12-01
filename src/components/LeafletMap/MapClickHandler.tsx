import React, { useEffect, useState } from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet';

import useElevation from '@root/hooks/useElevation';
import { useStore } from '@root/store/store';



/** 
 * @description this function handle click events on map
 * @pram useElevation is hook for fetching data
*/
export function AddMarkerToClick() {
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